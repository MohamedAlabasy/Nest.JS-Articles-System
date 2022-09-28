import { Body, Controller, Get, HttpException, HttpStatus, Param, Headers, ParseIntPipe, Post, UsePipes, ValidationPipe, PipeTransform } from '@nestjs/common';
import { emailVerification } from '../../utilities/email/emailVerification'
import { REGISTER_CODE, EXPIRE_CODE_TIME } from '../../utilities/common'
import { CheckEmailDto } from './dto/check-email.dto';
import { EmailLowerCasePipe } from './pipes/emial-lower-case.pipe';
import { UsersService } from '../users/users.service';
import { ForgotPasswordService } from './forgot-password.service';

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
    async resetUserPassword(request: Request) {

    }
}
