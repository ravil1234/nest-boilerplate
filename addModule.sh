#!/usr/bin/bash  

echo "Enter the module name: "  
read moduleName 

# npx nest g mo $moduleName --no-spec
# npx nest g co $moduleName --no-spec
# npx nest g s $moduleName --no-spec


entityLC=${moduleName,,}
entityUC=${moduleName^}

service=${entityUC}Service
controller=${entityUC}Controller
repository=${entityUC}Repository
dto=${entityUC}Dto
module=${entityUC}Module
base_path=~/Projects/nest-boilerplate/src/api
mkdir  $base_path/$entityLC
# Making sub-directory for every module
mkdir  $base_path/$entityLC/controllers
mkdir  $base_path/$entityLC/dtos
mkdir  $base_path/$entityLC/entities
mkdir  $base_path/$entityLC/repositories
mkdir  $base_path/$entityLC/services

touch ./src/api/$entityLC/dtos/$entityLC.dto.ts
sudo tee -a ./src/api/$entityLC/dtos/$entityLC.dto.ts >> /dev/null <<EOT
import { IsNotEmpty } from 'class-validator';
export class $dto {
  @IsNotEmpty()
  id: number;
}
EOT

touch ./src/api/$entityLC/entities/$entityLC.entity.ts
sudo tee -a ./src/api/$entityLC/entities/$entityLC.entity.ts >> /dev/null <<EOT
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class $entityUC {
  @PrimaryGeneratedColumn()
  id: number;
}
EOT

truncate -s 0 ./src/api/$entityLC/repositories/$entityLC.repository.ts
sudo tee -a ./src/api/$entityLC/repositories/$entityLC.repository.ts >> /dev/null <<EOT
import { Connection, EntityRepository, Repository } from 'typeorm';
import { $entityUC } from '../entities/$entityLC.entity';
@EntityRepository($entityUC)
export class $repository extends Repository<$entityUC> {
  constructor(private db: Connection) {
    super();
  }
}
EOT

truncate -s 0 ./src/api/$entityLC/services/$entityLC.service.ts
sudo tee -a ./src/api/$entityLC/services/$entityLC.service.ts >> /dev/null <<EOT
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Logger } from 'winston';
import { $entityUC } from '../entities/$entityLC.entity';
import { $repository } from '../repositories/$entityLC.repository';

@Injectable()
export class $service extends TypeOrmCrudService<$entityUC> {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    @InjectRepository($repository) repo) {
    super(repo);
  }
}
EOT

truncate -s 0 ./src/api/$entityLC/controllers/$entityLC.controller.ts
sudo tee -a ./src/api/$entityLC/controllers/$entityLC.controller.ts >> /dev/null <<EOT
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { $entityUC } from '../entities/$entityLC.entity';
import { $service } from '../services/$entityLC.service';

@Crud({
  model: {
    type: $entityUC,
  },
})
@Controller('$entityLC')
export class $controller implements CrudController<$entityUC> {
  constructor(public service: $service) {}
}
EOT


truncate -s 0 ./src/api/$entityLC/$entityLC.module.ts
sudo tee -a ./src/api/$entityLC/$entityLC.module.ts >> /dev/null <<EOT
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { $repository } from './repositories/$entityLC.repository';
import { $controller } from './controllers/$entityLC.controller';
import { $service } from './services/$entityLC.service';

@Module({
  imports: [TypeOrmModule.forFeature([$repository])],
  controllers: [$controller],
  providers: [$service],
  exports: [$service],
})
export class $module {}
EOT
echo "Module created successfully"