import { NotFoundException } from '@nestjs/common';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private db: Connection) {
    super();
  }

  /* Get user details by user name*/
  async getUserDetailsByUserId(username: string): Promise<User> {
    const user = await this.findOne({ userName: username });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }
}
