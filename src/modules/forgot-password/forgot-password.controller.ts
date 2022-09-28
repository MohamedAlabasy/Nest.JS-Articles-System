import { Body, Controller, Get, HttpException, HttpStatus, Param, Headers, ParseIntPipe, Post, UsePipes, ValidationPipe, PipeTransform } from '@nestjs/common';
import { emailVerification } from '../../utilities/email/emailVerification'
import { REGISTER_CODE, EXPIRE_CODE_TIME } from '../../utilities/common'
import { CheckEmailDto } from './dto/check-email.dto';
import { UsersService } from '../users/users.service';
import { ForgotPasswordService } from './forgot-password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailLowerCasePipe } from 'src/pipes/emial-lower-case.pipe';
import { HashPasswordPipe } from 'src/pipes/hash-password.pipe';

@Controller('forgotPassword')
export class ForgotPasswordController {
    private data: any;
    constructor(
        private readonly forgotPasswordService: ForgotPasswordService,
        private readonly usersService: UsersService
    ) {
        this.data = null;
    }
    // #=======================================================================================#
    // #                          send User email code to rest password                        #
    // #=======================================================================================#
    @Post('checkEmail')
    @UsePipes(ValidationPipe)
    async sendEmailCodeToRestPassword(@Body(EmailLowerCasePipe) _emailData: CheckEmailDto) {
        try {
            this.data = await this.usersService.getUserByEmail(_emailData.email)

            if (!this.data) {
                throw new Error(`Not user with this email = ${_emailData.email}`)
            }

            const registerCode = REGISTER_CODE;
            this.data = await this.forgotPasswordService.sendEmailCodeToRestPassword(registerCode, EXPIRE_CODE_TIME, this.data.id)

            if (this.data)
                emailVerification({ email: _emailData.email, name: this.data.name }, registerCode, true);
            else
                throw new Error(`can't send email code to this email = ${_emailData.email}`)

            return {
                statusCode: 200,
                message: `The code has been sent to your email = ${_emailData.email}`
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    // #=======================================================================================#
    // #                                  reset User password                                  #
    // #=======================================================================================#
    @Post('resetPassword')
    @UsePipes(ValidationPipe)
    async resetUserPassword(@Body(HashPasswordPipe) _resetData: ResetPasswordDto) {
        try {
            this.data = await this.forgotPasswordService.checkCode(_resetData)

            if (!this.data[0]) {
                throw new Error(`No code send to user with id = ${_resetData.user}`)
            } else if (_resetData.code != this.data[0].code) {
                throw new Error('invalid code');
            } else if (new Date() >= this.data[0].expire_at) {
                // If the code exceeds a certain time and it has not been used in this application for 24 hours
                throw new Error('This code has expired');
            }

            this.data = await this.usersService.resetUserPassword(_resetData.user, _resetData.password)

            if (this.data.affected === 0) {
                throw new Error('an error occurred while changing the password, please try again');
            }

            return {
                statusCode: 200,
                message: 'Password has been successfully restored'
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
