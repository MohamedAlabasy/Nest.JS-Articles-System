import { Controller, Post, Delete, Headers, Get, Param, UsePipes, ValidationPipe, Body, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { GET_ID_FROM_TOKEN } from 'src/utilities/get-id-from-token';
import { ArticlesService } from '../articles/articles.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
    private data: any;
    constructor(
        private readonly likesService: LikesService,
        private readonly articlesService: ArticlesService
    ) {
        this.data = null
    }

    // #=======================================================================================#
    // #			                     create like on article                                #
    // #=======================================================================================#
    @Post()
    @UsePipes(ValidationPipe)
    async createArticle(@Body() _articleData: CreateLikeDto, @Headers() _headers) {
        try {
            _articleData.user = GET_ID_FROM_TOKEN(_headers)

            this.data = await this.articlesService.getArticleById(_articleData.article)
            if (!this.data) {
                throw new Error(`no article with this id =${_articleData.article}`);
            }

            this.data = await this.likesService.checkLikeArticle(_articleData.user, _articleData.article)
            if (this.data.length > 0) {
                throw new Error('You have already liked this article');
            }

            this.data = await this.likesService.createLikeArticle(_articleData)
            if (!this.data) {
                throw new Error('can\'t like this article please try again');
            }

            return {
                statusCode: 200,
                data: this.data
            }

        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
    // #=======================================================================================#
    // #			                        unlike article                                     #
    // #=======================================================================================#
    @Delete(':articleID')
    @UsePipes(ValidationPipe)
    async unLikeArticle(@Param('articleID', ParseIntPipe) _articleID: number, @Headers() _headers) {
        try {
            const userID = GET_ID_FROM_TOKEN(_headers)

            this.data = await this.articlesService.getArticleById(_articleID)
            if (!this.data) {
                throw new Error(`no article with this id =${_articleID}`);
            }

            this.data = await this.likesService.getLikeByArticleId(_articleID)
            if (this.data.user.id !== userID) {
                throw new Error('this like can only be unlike by the person who created it')
            }

            this.data = await this.likesService.checkLikeArticle(userID, _articleID)
            if (this.data.length === 0) {
                throw new Error('You didn\'t like this article before');
            }

            this.data = await this.likesService.unLikeArticle(this.data[0].id)
            if (this.data.affected === 0) {
                throw new Error('can\'t unLiked this article');
            }

            return {
                statusCode: 200,
                message: 'unLiked successfully'
            }

        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
    // #=======================================================================================#
    // #			                    get all like on article                                #
    // #=======================================================================================#
    @Get(':articleID')
    async getAllLikeOnArticle(@Param('articleID', ParseIntPipe) _articleID: number) {
        try {
            this.data = await this.likesService.getAllLikeOnArticle(_articleID)

            if (this.data.length === 0) {
                throw new Error(`there is no like with this article = ${_articleID}`);
            }

            return {
                statusCode: 200,
                count: this.data.length,
                data: this.data
            }

        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
