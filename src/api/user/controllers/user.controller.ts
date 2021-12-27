import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { UserToken } from 'src/types/user.types';
import { Logger } from 'winston';
import { AuthDto } from '../dtos/auth.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
@Controller('user')
export class UserController {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private userService: UserService,
  ) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: AuthDto): Promise<UserToken> {
    return this.userService.signUp(dto);
  }
  @Get()
  getUserDetailsByUserId(@GetCurrentUser('id') userId: number): Promise<User> {
    this.logger.info('hello........', userId);
    return this.userService.getUserDetailsByUserId(userId);
  }
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logOut(@GetCurrentUser('id') userId: number) {
    return this.userService.logOut(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUser('id') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.userService.updateTokens(userId, refreshToken);
  }
}
