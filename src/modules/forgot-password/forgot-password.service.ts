import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForgotPassword } from 'src/database/entities/forgot-password.entity';
import { Repository } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class ForgotPasswordService {
    private data: any;
    constructor(@InjectRepository(ForgotPassword) private forgotPasswordRepository: Repository<ForgotPassword>) {
        this.data = null;
    }
    // #=======================================================================================#
    // #                          send User email code to rest password                        #
    // #=======================================================================================#
    async sendEmailCodeToRestPassword(code, expire_at, user): Promise<ForgotPassword> {
        this.data = this.forgotPasswordRepository.create({
            code,
            created_at: new Date(Date.now()),
            expire_at: new Date(Date.now() + expire_at),
            user
        })
        return await this.forgotPasswordRepository.save(this.data)
    }

    // #=======================================================================================#
    // #			                        check code                                         #
    // #=======================================================================================#
    async checkCode(_resetData: ResetPasswordDto): Promise<ForgotPassword> {
        // this.data = await this.emailVerificationRepository.find({relations:['user'],where:{ userId: _resetData.user} })
        return await this.forgotPasswordRepository.query(`select * from forgot_password where code = ${_resetData.code} and userId = ${_resetData.user}`)
    }
}
