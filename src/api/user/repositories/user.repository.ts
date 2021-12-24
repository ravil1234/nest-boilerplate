import { NotFoundException } from '@nestjs/common';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private db: Connection) {
    super();
  }

  /* Get user details by user name*/
  async getUserDetailsByUserId(userId: number): Promise<User> {
    const user = await this.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }
}
