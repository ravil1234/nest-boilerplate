import { Connection, EntityRepository, Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  constructor(private db: Connection) {
    super();
  }
}
