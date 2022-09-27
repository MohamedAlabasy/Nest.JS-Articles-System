import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/database/entities/comments.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  exports: [TypeOrmModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule { }
