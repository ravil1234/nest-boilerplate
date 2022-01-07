import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private userService: UserService,
  ) {}
  @ApiOperation({
    summary: 'Get user by username',
    description: 'Pass username in query params to get user details',
  })
  @Get('/:username')
  getUserDetailsByUserId(@Param('username') username: string): Promise<User> {
    this.logger.info('hello........');
    return this.userService.getUserDetailsByUserId(username);
  }
}
