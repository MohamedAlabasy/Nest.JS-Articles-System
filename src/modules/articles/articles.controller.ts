import { Controller, Get, Post, Patch, Headers, Delete, HttpException, HttpStatus, Body, ValidationPipe, UsePipes, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GET_ID_FROM_TOKEN } from '../../utilities/get-id-from-token';

@Controller('articles')
export class ArticlesController {
    private data: any;
    constructor(
        private readonly articlesService: ArticlesService,
        private readonly usersService: UsersService
    ) {
        this.data = null;
    }
    // #=======================================================================================#
    // #			                          create Article                                   #
    // #=======================================================================================#
    @Post()
    @UsePipes(ValidationPipe)
    async createArticle(@Body() _articleData: CreateArticleDto, @Headers() _headers) {
        try {
            _articleData.user = GET_ID_FROM_TOKEN(_headers)

            this.data = await this.articlesService.createArticle(_articleData)

            return {
                statusCode: 200,
                data: this.data
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
    // #=======================================================================================#
    // #			                        get article by id                                  #
    // #=======================================================================================#
    @Get(':id')
    async getArticleById(@Param('id', ParseIntPipe) _id: number) {
        try {
            this.data = await this.articlesService.getArticleById(_id)

            if (!this.data) {
                throw new Error(`No articles with this id = ${_id}`)
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
    // #			                        get all articles                                   #
    // #=======================================================================================#
    @Get()
    async getAllArticles() {
        try {
            this.data = await this.articlesService.getAllArticles()

            if (this.data.length == 0) {
                throw new Error('No articles to show')
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
    // #=======================================================================================#
    // #			                        update articles                                    #
    // #=======================================================================================#
    @Patch(':_articleID')
    @UsePipes(ValidationPipe)
    async updateArticle(@Param('_articleID', ParseIntPipe) _articleID: number, @Body() _articleData: UpdateArticleDto, @Headers() _headers) {
        try {
            _articleData.user = GET_ID_FROM_TOKEN(_headers)

            this.data = await this.usersService.getUserById(_articleData.user)
            if (!this.data) {
                throw new Error(`No user with this id = ${_articleData.user}`)
            }

            this.data = await this.articlesService.getArticleById(_articleID)
            if (!this.data) {
                throw new Error(`no articles with this id = ${_articleID}`)
            }

            if (this.data.user.id !== GET_ID_FROM_TOKEN(_headers)) {
                throw new Error('this article can only be modified by the person who created it')
            }

            this.data = await this.articlesService.updateArticle(_articleID, _articleData)
            if (this.data.affected === 0) {
                throw new Error(`can't update articles with this id = ${_articleID}`)
            }
            return {
                statusCode: 200,
                message: 'articles updated successfully',
                data: this.data.data
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
    // #=======================================================================================#
    // #			                        delete articles                                    #
    // #=======================================================================================#
    @Delete(':_articleID')
    async deleteArticle(@Param('_articleID', ParseIntPipe) _articleID: number, @Headers() _headers) {
        try {
            const userID = GET_ID_FROM_TOKEN(_headers)
            this.data = await this.usersService.getUserById(userID)
            if (!this.data) {
                throw new Error(`No user with this id = ${userID}`)
            }

            this.data = await this.articlesService.getArticleById(_articleID)
            if (!this.data) {
                throw new Error(`no articles with this id = ${_articleID}`)
            }

            if (this.data.user.id !== userID) {
                throw new Error('this article can only be deleted by the person who created it')
            }

            this.data = await this.articlesService.deleteArticle(_articleID)
            if (this.data.affected === 0) {
                throw new Error(`can't delete articles with this id  = ${_articleID}`)
            }

            return {
                statusCode: 200,
                message: 'articles deleted successfully'
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }


}
