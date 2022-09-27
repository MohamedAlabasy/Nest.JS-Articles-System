import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from 'src/database/entities/articles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {
    private data: any;
    constructor(@InjectRepository(Articles) private articlesRepository: Repository<Articles>) {
        this.data = null;
    }

    // #=======================================================================================#
    // #			                        get all Articles                                   #
    // #=======================================================================================#
    async getAllArticles(): Promise<Articles[]> {
        return await this.articlesRepository.find();
    }

}
