import { Body, Controller, Get, HttpException, HttpStatus, Param, Headers, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ForgotPassword } from 'src/database/entities/forgot-password.entity';

@Controller('forgotPassword')
export class ForgotPasswordController {
    private data: any;
    constructor(private readonly forgotPasswordService: ForgotPassword) {
        this.data = null;
    }
}
