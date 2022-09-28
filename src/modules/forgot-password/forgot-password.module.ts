import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgotPassword } from 'src/database/entities/forgot-password.entity';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordService } from './forgot-password.service';

@Module({
  imports: [TypeOrmModule.forFeature([ForgotPassword])],
  exports: [TypeOrmModule],

  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService]
})
export class ForgotPasswordModule { }
