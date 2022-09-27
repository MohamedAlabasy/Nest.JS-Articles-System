import { Controller, Post, UsePipes, ValidationPipe, Body, HttpException, HttpStatus } from '@nestjs/common';
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
            console.log(this.data);

            if (this.data) {
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
}
