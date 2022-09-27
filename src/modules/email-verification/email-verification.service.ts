import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailVerification } from 'src/database/entities/email-verification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailVerificationService {
    private data: any;

    constructor(@InjectRepository(EmailVerification) private emailVerificationRepository: Repository<EmailVerification>) {
        this.data = null;
    }

    // #=======================================================================================#
    // #			                   create new email verification                           #
    // #=======================================================================================#
    async createNewEmailVerification(code, expire_at, user): Promise<EmailVerification> {
        this.data = this.emailVerificationRepository.create({
            code,
            created_at: new Date(Date.now()),
            expire_at: new Date(Date.now() + expire_at),
            user
        });
        return await this.emailVerificationRepository.save(this.data);
    }
}
