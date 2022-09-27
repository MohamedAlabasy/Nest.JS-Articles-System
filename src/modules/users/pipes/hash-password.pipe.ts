import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUsers } from '../dto/create-users.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class HashPassword implements PipeTransform {
  transform(value: CreateUsers, metadata: ArgumentMetadata) {
    return {
      ...value,
      email: value.email.toLocaleLowerCase(),
      password: bcrypt.hashSync(value.password, 10)
    }
  }
}
