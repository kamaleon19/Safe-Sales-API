import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService],
  imports: [

    CommonModule,

    TypeOrmModule.forFeature([ Supplier ])
  ]
})
export class SuppliersModule {}
