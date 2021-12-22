import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from 'winston';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
@Injectable()
export class UserService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  /* Get user details by user id */
  async getUserDetailsByUserId(user_id: string): Promise<User> {
    return await this.userRepository.getUserDetailsByUserId(user_id);
  }
}
