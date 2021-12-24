import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { env } from 'src/env';
import { JwtToken } from 'src/types/jwt-token.types';
import { UserToken } from 'src/types/user.types';
import { Logger } from 'winston';
import { AuthDto } from '../dtos/auth.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
@Injectable()
export class UserService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /* Get user details by user id */
  async getUserDetailsByUserId(userId: number): Promise<User> {
    return await this.userRepository.getUserDetailsByUserId(userId);
  }
  async signUp(dto: AuthDto): Promise<UserToken> {
    const hash = await this.hashData(dto.password);
    dto.password = hash;
    const newUser = await this.userRepository.save(dto);
    const tokens = await this.getTokens(newUser.id, newUser.email);
    return { id: newUser.id, ...tokens };
  }
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, email: string): Promise<JwtToken> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: env.jwt.jwtSecret,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: env.jwt.jwtRefresh,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
