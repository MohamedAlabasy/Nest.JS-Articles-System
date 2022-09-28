import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { RegisterPipe } from '../../pipes/register.pipe';
import { LoginDto } from './dto/login.dto';
import { ACCESS_TOKEN_SECRET } from '../../config/token.config';
import { emailVerification } from '../../utilities/email/emailVerification';
import { EmailVerificationService } from '../email-verification/email-verification.service';
import { CreateEmailActivateDto } from '../email-verification/dto/create-email-activate.dto';
import { REGISTER_CODE, EXPIRE_CODE_TIME } from '../../utilities/common'
import { EmailLowerCasePipe } from 'src/pipes/emial-lower-case.pipe';

@Controller('users')
export class UsersController {
    private data: any;
    constructor(
        private readonly usersService: UsersService,
        private readonly emailVerificationService: EmailVerificationService
    ) {
        this.data = null;
    }

    // #=======================================================================================#
    // #			                            Register                                       #
    // #=======================================================================================#
    @Post('register')
    @UsePipes(ValidationPipe)
    async createNewUser(@Body(RegisterPipe) _userData: CreateUsersDto) {
        try {
            this.data = await this.usersService.createNewUser(_userData)

            // use create and wanna send email code
            if (this.data) {
                // auto generate code = 6 numbers
                const registerCode = REGISTER_CODE
                const storeEmailCode = await this.emailVerificationService.createNewEmailVerification(registerCode, EXPIRE_CODE_TIME, this.data.id)

                if (storeEmailCode)
                    emailVerification(_userData, registerCode);
                else
                    throw new Error(`can't send email code to this email = ${_userData.email}`)
            }
            return {
                statusCode: 200,
                data: this.data
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    // #=======================================================================================#
    // #			                        activate email                                     #
    // #=======================================================================================#
    @Post('activate')
    @UsePipes(ValidationPipe)
    async activateEmail(@Body() _emailActivateData: CreateEmailActivateDto) {
        try {
            this.data = await this.emailVerificationService.checkCode(_emailActivateData)

            if (!this.data) {
                throw new Error(`Not send code to user with id = ${_emailActivateData.user}`)
            } else if (_emailActivateData.code != this.data[0].code) {
                throw new Error('invalid code');
            } else if (new Date() >= this.data[0].expire_at) {
                // If the code exceeds a certain time and it has not been used in this application for 24 hours
                throw new Error('This code has expired');
            }

            // update user data is_verification = true
            this.data = await this.usersService.activateUserAccount(_emailActivateData.user)

            if (!this.data) throw new Error('can\'t activate this email');

            return {
                statusCode: 200,
                message: 'email activation successfully'
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
    // #=======================================================================================#
    // #			                            login                                          #
    // #=======================================================================================#
    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body(EmailLowerCasePipe) _userData: LoginDto) {
        try {
            this.data = await this.usersService.login(_userData);

            if (!this.data) {
                throw new Error(`there is no user with this email = ${_userData.email}`)
            }

            const IsValidPassword: boolean = bcrypt.compareSync(_userData.password, this.data.password);
            if (!IsValidPassword) {
                throw new Error('invalid password')
            }

            // to add token
            const token: string = 'Bearer ' + jwt.sign({ id: this.data.id, email: this.data.email, is_verification: this.data.is_verification }, ACCESS_TOKEN_SECRET as string, {
                expiresIn: 86400 //for 24 hour
            });

            return {
                statusCode: 200,
                token,
                data: this.data
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    // #=======================================================================================#
    // #                           get User by id for testing purpose                          #
    // #=======================================================================================#
    @Get('show/:id')
    async getUserById(@Param('id', ParseIntPipe) _userID: number) {
        try {
            this.data = await this.usersService.getUserById(_userID)

            if (!this.data) {
                throw new Error(`No user with this id = ${_userID}`)
            }

            return {
                statusCode: 200,
                data: this.data
            }
        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
