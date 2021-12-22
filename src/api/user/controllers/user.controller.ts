import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Logger } from 'winston';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
@Controller('user')
export class UserController {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private userService: UserService,
  ) {}

  /* Get user details by user id */
  @Get('/:username')
  getUserDetailsByUserId(@Param('username') username: string): Promise<User> {
    this.logger.info('hello........');
    return this.userService.getUserDetailsByUserId(username);
  }
}
