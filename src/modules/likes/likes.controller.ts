import { Controller, Post, Delete, Get, Param, UsePipes, ValidationPipe, Body, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
    private data: any;
    constructor(private readonly likesService: LikesService) {
        this.data = null
    }

    // #=======================================================================================#
    // #			                      create like article                                  #
    // #=======================================================================================#
    @Post()
    @UsePipes(ValidationPipe)
    async createArticle(@Body() _articleData: CreateLikeDto) {
        try {
            this.data = await this.likesService.checkLikeArticle(_articleData.user, _articleData.article)

            if (this.data.length > 0) {
                throw new Error('You have already liked this article');
            }

            this.data = await this.likesService.createLikeArticle(_articleData)
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
    @Delete(':userID/:articleID')
    @UsePipes(ValidationPipe)
    async unLikeArticle(@Param('userID', ParseIntPipe) _userID: number, @Param('articleID', ParseIntPipe) _articleID: number) {
        try {
            this.data = await this.likesService.checkLikeArticle(_userID, _articleID)

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
