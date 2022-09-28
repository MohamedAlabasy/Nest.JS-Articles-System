import { Controller, Get, Post, Patch, Delete, HttpException, HttpStatus, Body, ValidationPipe, UsePipes, Param, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto copy';

@Controller('comments')
export class CommentsController {
    private data: any;
    constructor(private readonly commentService: CommentsService) {
        this.data = null;
    }
    // #=======================================================================================#
    // #			                          create Article                                   #
    // #=======================================================================================#
    @Post()
    @UsePipes(ValidationPipe)
    async createArticle(@Body() _commentData: CreateCommentDto) {
        try {
            this.data = await this.commentService.createComment(_commentData)

            return {
                statusCode: 200,
                data: this.data
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
    // #=======================================================================================#
    // #			                     get all comments on articles                          #
    // #=======================================================================================#
    @Get(":articleID")
    async getAllComments(@Param('articleID', ParseIntPipe) _articleID: number) {
        try {
            this.data = await this.commentService.getAllComments(_articleID)

            if (this.data.length == 0) {
                throw new Error('No comments on this articles to show')
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
    // #			                        update comments                                    #
    // #=======================================================================================#
    @Patch(':commentID')
    @UsePipes(ValidationPipe)
    async updateComment(@Param('commentID', ParseIntPipe) _commentID: number, @Body() _commentData: UpdateCommentDto) {
        try {
            this.data = await this.commentService.updateComment(_commentID, _commentData)
            console.log(this.data);

            if (this.data.affected === 0) {
                throw new Error(`No articles with this id = ${_commentID}`)
            }
            this.data = await this.commentService.getCommentById(_commentID)


            return {
                statusCode: 200,
                message: 'articles updated successfully',
                data: this.data
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
    // #=======================================================================================#
    // #			                        delete comments                                    #
    // #=======================================================================================#
    @Delete(':commentID')
    async deleteComment(@Param('commentID', ParseIntPipe) _commentID: number) {
        try {
            this.data = await this.commentService.deleteComment(_commentID)
            console.log(this.data.affected);

            if (this.data.affected === 0) {
                throw new Error(`No articles with this id = ${_commentID}`)
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
