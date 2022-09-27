import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from 'src/database/entities/articles.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
    private data: any;
    constructor(@InjectRepository(Articles) private articlesRepository: Repository<Articles>) {
        this.data = null;
    }

    // #=======================================================================================#
    // #			                          create article                                   #
    // #=======================================================================================#
    async createArticle(_articleData: CreateArticleDto): Promise<Articles> {
        this.data = this.articlesRepository.create({
            title: _articleData.title,
            description: _articleData.description,
            user: _articleData.user
        });
        return await this.articlesRepository.save(this.data)

    }
    // #=======================================================================================#
    // #			                        get article by id                                  #
    // #=======================================================================================#
    async getArticleById(id: number): Promise<Articles> {
        return await this.articlesRepository.findOne({ relations: ['user'], where: { id } })
    }
    // #=======================================================================================#
    // #			                        get all articles                                   #
    // #=======================================================================================#
    async getAllArticles(): Promise<Articles[]> {
        return await this.articlesRepository.find();
    }

}
