import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from 'src/database/entities/users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) { }

    // #=======================================================================================#
    // #			                         create new user                                   #
    // #=======================================================================================#
    async createNewUser(_user: CreateUsersDto): Promise<Users> {
        const user = this.usersRepository.create({
            name: _user.name,
            email: _user.email,
            is_verification: false,
            password: _user.password,
            is_admin: false,
            token: null,
        });
        return await this.usersRepository.save(user);
    }
    // #=======================================================================================#
    // #			                            login                                          #
    // #=======================================================================================#
    async login(_user: CreateUsersDto): Promise<Users> {
        return await this.usersRepository.findOne({ where: { email: _user.email } });
    }
    // #=======================================================================================#
    // #                           get User by id for testing purpose                          #
    // #=======================================================================================#
    async getUserById(id: number): Promise<Users> {
        return await this.usersRepository.findOneBy({ id });
    }
}
