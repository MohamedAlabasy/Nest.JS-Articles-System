import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from 'src/database/entities/articles.entity';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Articles])],
  exports: [TypeOrmModule],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule { }
