import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';


@Injectable()
export class LoginPipe implements PipeTransform {
  transform(value: LoginDto, metadata: ArgumentMetadata) {
    return {
      ...value,
      email: value.email.toLocaleLowerCase(),
    }
  }
}
