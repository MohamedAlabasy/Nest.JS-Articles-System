import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Users } from 'src/database/entities/users.entity';
import { CreateUsers } from './dto/create-users.dto';
import { UsersService } from './users.service';

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
    // createNewUser(@Body() _user: CreateUsers): Promise<Users> {
    async createNewUser(@Body() _user: CreateUsers) {
        try {
            this.data = await this.usersService.createNewUser(_user)
            return {
                statusCode: 200,
                data: this.data
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
        // await this.usersService.createNewUser(_user)
        //     .then((data) => {
        //         console.log(data);
        //         return {
        //             statusCode: 200,
        //             data: data
        //         }
        //     }).catch((error) => {
        //         return new HttpException(error, HttpStatus.BAD_REQUEST)
        //     })
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
