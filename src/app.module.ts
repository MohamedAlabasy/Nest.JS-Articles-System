import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

import { UsersModule } from './modules/users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CheckTokensMiddleware } from './middleware/check-tokens.middleware';
import { EmailVerificationModule } from './modules/email-verification/email-verification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    EmailVerificationModule,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware).forRoutes('*')
      .apply(CheckTokensMiddleware).exclude(
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users/register', method: RequestMethod.POST },
      ).forRoutes('*')
  }
}
