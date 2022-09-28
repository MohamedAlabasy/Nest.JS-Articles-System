import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForgotPassword } from 'src/database/entities/forgot-password.entity';
import { Repository } from 'typeorm';
import { CheckEmailDto } from './dto/check-email.dto';

@Injectable()
export class ForgotPasswordService {
    private data: any;
    constructor(@InjectRepository(ForgotPassword) private forgotPasswordRepository: Repository<ForgotPassword>) {
        this.data = null;
    }
    // #=======================================================================================#
    // #                          send User email code to rest password                        #
    // #=======================================================================================#
    async sendEmailCodeToRestPassword(code, expire_at, user) {
        this.data = this.forgotPasswordRepository.create({
            code,
            created_at: new Date(Date.now()),
            expire_at: new Date(Date.now() + expire_at),
            user
        })
        return await this.forgotPasswordRepository.save(this.data)
    }


    // #=======================================================================================#
    // #                                  reset User password                                  #
    // #=======================================================================================#
    async resetUserPassword() {
        // return await this.likeRepository.find({ relations: ['user', 'article'], where: { article } })

    }
}
