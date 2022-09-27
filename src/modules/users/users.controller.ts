import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { HashPassword } from './pipes/hash-password.pipe';


@Controller('users')
export class UsersController {
    private data: object | object[];
    constructor(private readonly usersService: UsersService) {
        this.data = null;
    }

    // #=======================================================================================#
    // #			                            Register                                       #
    // #=======================================================================================#
    @Post('register')
    @UsePipes(ValidationPipe)
    async createNewUser(@Body(HashPassword) _userData: CreateUsersDto) {
        try {
            this.data = await this.usersService.createNewUser(_userData)
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
    async login(@Body() _userData: CreateUsersDto) {
        try {
            this.data = await this.usersService.login(_userData)
            return {
                statusCode: 200,
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
