import { Controller, Get, Post, HttpException, HttpStatus, Body, ValidationPipe, UsePipes } from '@nestjs/common';
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
    // #			                        get all Articles                                   #
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


}
