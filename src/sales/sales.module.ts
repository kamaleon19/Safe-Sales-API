import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [

    TypeOrmModule.forFeature([ Sale ]),

    CustomersModule,

    ProductsModule

  ]
})
export class SalesModule {}
