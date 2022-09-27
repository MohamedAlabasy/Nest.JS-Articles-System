import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from 'src/database/entities/users.entity';
import { CreateUsers } from './dto/create-users.dto';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) { }

    // #=======================================================================================#
    // #			                         create new user                                   #
    // #=======================================================================================#
    async createNewUser(_user: CreateUsers): Promise<Users> {
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

    async getUserById(id: number): Promise<Users> {
        return await this.usersRepository.findOneBy({ id });
    }
}
