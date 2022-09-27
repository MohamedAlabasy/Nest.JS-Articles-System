import { Body, Controller, Get, HttpException, HttpStatus, Param, Headers, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { RegisterPipe } from './pipes/register.pipe';
import { LoginDto } from './dto/login.dto';
import { LoginPipe } from './pipes/login.pipe';
import { ACCESS_TOKEN_SECRET } from '../../config/token.config';
import { emailVerification } from '../../utilities/email/emailVerification';

@Controller('users')
export class UsersController {
    private data: any;
    constructor(private readonly usersService: UsersService) {
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
                const registerCode = Math.floor(100000 + Math.random() * 900000);
                const expireCodeTime = 3600000;

                emailVerification(_userData, registerCode);
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
    // #			                            login                                          #
    // #=======================================================================================#
    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body(LoginPipe) _userData: LoginDto) {
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
