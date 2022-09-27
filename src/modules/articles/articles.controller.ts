import { Controller, Get, Post, Delete, HttpException, HttpStatus, Body, ValidationPipe, UsePipes, Param, ParseIntPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
    private data: any;
    constructor(private readonly articlesService: ArticlesService) {
        this.data = null;
    }
    // #=======================================================================================#
    // #			                          create Article                                   #
    // #=======================================================================================#
    @Post()
    @UsePipes(ValidationPipe)
    async createArticle(@Body() _articleData: CreateArticleDto) {
        try {
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
    // #			                        delete articles                                    #
    // #=======================================================================================#
    @Delete(':id')
    async deleteArticle(@Param('id', ParseIntPipe) _id: number) {
        try {
            this.data = await this.articlesService.deleteArticle(_id)
            console.log(this.data.affected);

            if (this.data.affected === 0) {
                throw new Error(`No articles with this id = ${_id}`)
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
