import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
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
    const tokens = await this.generateJwtTokens({
      id: newUser.id,
      email: newUser.email,
    });
    return { id: newUser.id, ...tokens };
  }
  async updateTokens(userId: number, refreshToken: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const isRefreshMatched = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!isRefreshMatched) throw new ForbiddenException('Access Denied');

    const tokens = await this.generateJwtTokens({
      id: user.id,
      email: user.email,
    });
    await this.updateRefreshToken(
      user.id,
      await this.hashData(tokens.refreshToken),
    );
    return {
      code: 200,
      message: 'Token updated successfully',
      data: { user, ...tokens },
    };
  }
  public async logOut(userId: number) {
    return this.updateRefreshToken(userId, null);
  }

  private async generateJwtTokens(user: Partial<User>): Promise<JwtToken> {
    const [accessKey, refreshKey] = await Promise.all([
      this.jwtService.signAsync(user, {
        secret: env.jwt.accessKey,
        expiresIn: env.jwt.expirationTime,
      }),
      this.jwtService.signAsync(user, {
        secret: env.jwt.refreshKey,
        expiresIn: env.jwt.expirationTime + 60 * 60,
      }),
    ]);
    return {
      accessToken: accessKey,
      refreshToken: refreshKey,
    };
  }
  private async updateRefreshToken(
    userId: number,
    refreshToken: string | null,
  ): Promise<void> {
    const data = await this.userRepository.update(
      { id: userId },
      { refreshToken: refreshToken },
    );
    if (data.affected > 0) {
      throw new BadRequestException('Failed to update token');
    }
  }
  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
