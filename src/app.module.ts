import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true
    // }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule { }
