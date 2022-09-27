import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUsersDto } from '../dto/create-users.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class RegisterPipe implements PipeTransform {
  transform(value: CreateUsersDto, metadata: ArgumentMetadata) {
    return {
      ...value,
      email: value.email.toLocaleLowerCase(),
      password: bcrypt.hashSync(value.password, 10)
    }
  }
}
