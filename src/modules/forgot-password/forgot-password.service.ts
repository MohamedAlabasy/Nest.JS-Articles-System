import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForgotPassword } from 'src/database/entities/forgot-password.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ForgotPasswordService {
    private data: any;
    constructor(@InjectRepository(ForgotPassword) private forgotPasswordRepository: Repository<ForgotPassword>) {
        this.data = null;
    }

}
