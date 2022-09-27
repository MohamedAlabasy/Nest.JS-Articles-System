import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
    private data: any;
    constructor(private readonly articlesService: ArticlesService) {
        this.data = null;
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
