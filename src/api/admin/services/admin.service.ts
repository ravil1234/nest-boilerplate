import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Logger } from 'winston';
import { Admin } from '../entities/admin.entity';
import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class AdminService extends TypeOrmCrudService<Admin> {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    @InjectRepository(AdminRepository) repo) {
    super(repo);
  }
}
