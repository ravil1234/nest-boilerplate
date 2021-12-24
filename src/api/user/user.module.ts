import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
} from '../../strategies/index';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [UserService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [UserService],
})
export class UserModule {}
