import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AdminModule } from './api/admin/admin.module';
import { RedisCacheModule } from './api/redis/redis.module';
import { UserModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessTokenGuard } from './common/guards';
import { typeOrmConfig } from './database/typeorm.config';
import { winstonOptions } from './libs/logger/logger';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonOptions),
    UserModule,
    AdminModule,
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    AppService,
  ],
})
export class AppModule {}
