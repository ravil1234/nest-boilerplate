import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Admin } from '../entities/admin.entity';
import { AdminService } from '../services/admin.service';

@Crud({
  model: {
    type: Admin,
  },
})
@Controller('admin')
export class AdminController implements CrudController<Admin> {
  constructor(public service: AdminService) {}
}
