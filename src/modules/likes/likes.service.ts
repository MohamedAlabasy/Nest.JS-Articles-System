import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from 'src/database/entities/likes.entity';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
    private data: any;
    constructor(@InjectRepository(Likes) private likeRepository: Repository<Likes>) {
        this.data = null;
    }

    // #=======================================================================================#
    // #			                      check like article                                   #
    // #=======================================================================================#
    async checkLikeArticle(user: number, article: number): Promise<Likes> {
        return await this.likeRepository.findOne({ where: { user, article } })
    }

    // #=======================================================================================#
    // #			                      create like article                                  #
    // #=======================================================================================#
    async createLikeArticle(_likeData: CreateLikeDto): Promise<Likes> {
        this.data = this.likeRepository.create({
            type: _likeData.type,
            article: _likeData.article,
            user: _likeData.user,
        });
        return await this.likeRepository.save(this.data)
    }
    // #=======================================================================================#
    // #			                        unlike article                                     #
    // #=======================================================================================#
    async unLikeArticle(id: number) {
        return await this.likeRepository.delete({ id })
    }
}
