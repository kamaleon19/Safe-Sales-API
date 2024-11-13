import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [ 

    TypeOrmModule.forFeature([ Customer ]),

    CommonModule
  ]
})
export class CustomersModule {}
