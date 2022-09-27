import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from 'src/database/entities/likes.entity';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Likes])],
  exports: [TypeOrmModule],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule { }
