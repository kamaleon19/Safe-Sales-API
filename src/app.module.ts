import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ExpensesModule } from './expenses/expenses.module';
import { SalesModule } from './sales/sales.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [

    ConfigModule.forRoot({ 
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),


    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: ['src/**/*.entity.ts'],
    }),


    ProductsModule,


    AuthModule,


    CustomersModule,


    SuppliersModule,


    ExpensesModule,


    SalesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
