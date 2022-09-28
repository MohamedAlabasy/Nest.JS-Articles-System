import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CheckEmailDto } from '../dto/check-email.dto';


@Injectable()
export class EmailLowerCasePipe implements PipeTransform {
  transform(value: CheckEmailDto, metadata: ArgumentMetadata) {
    return {
      ...value,
      email: value.email.toLocaleLowerCase(),
    }
  }
}
