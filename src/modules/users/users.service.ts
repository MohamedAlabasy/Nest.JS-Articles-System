import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from 'src/database/entities/users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class UsersService {
    private data: any;
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {
        this.data = null;
    }

    // #=======================================================================================#
    // #			                         create new user                                   #
    // #=======================================================================================#
    async createNewUser(_userData: CreateUsersDto): Promise<Users> {
        this.data = this.usersRepository.create({
            name: _userData.name,
            email: _userData.email,
            password: _userData.password,
            is_verification: false,
            is_admin: false,
            token: null,
        });
        return await this.usersRepository.save(this.data);
    }
    // #=======================================================================================#
    // #			                    activate user account                                  #
    // #=======================================================================================#
    async activateUserAccount(_userID: number) {
        return await this.usersRepository.update({ id: _userID }, { is_verification: true })
    }

    // #=======================================================================================#
    // #			                            login                                          #
    // #=======================================================================================#
    async login(_userData: LoginDto): Promise<Users> {
        return await this.usersRepository.findOne({ where: { email: _userData.email } });
    }

    // #=======================================================================================#
    // #                         get User by email for forgot password                         #
    // #=======================================================================================#
    async getUserByEmail(email: string): Promise<Users> {
        return await this.usersRepository.findOneBy({ email });
    }

    // #=======================================================================================#
    // #                           get User by id for testing purpose                          #
    // #=======================================================================================#
    async getUserById(id: number): Promise<Users> {
        return await this.usersRepository.findOneBy({ id });
    }
}
