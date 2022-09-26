import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getData() {
        return 'heel'
    }
}
