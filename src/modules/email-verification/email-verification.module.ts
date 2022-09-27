import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from 'src/database/entities/email-verification.entity';
import { EmailVerificationController } from './email-verification.controller';
import { EmailVerificationService } from './email-verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerification])],
  exports: [TypeOrmModule],

  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],

})
export class EmailVerificationModule { }
