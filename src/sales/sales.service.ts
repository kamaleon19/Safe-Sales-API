import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Between, In, Repository } from 'typeorm';

import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';

import { CustomersService } from 'src/customers/customers.service';

import { PaymentMethod } from './enums';
import { DateFilterDto } from './dto/date-filter.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productService: ProductsService,

    private readonly customerService: CustomersService,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    try {
      // Busqueda de cliente al que se le asignara la compra y confirmacion de productos.

      const customer = await this.customerService.findOne(
        createSaleDto.customer,
      );

      // Busqueda de productos y confirmacion de existencia.
      const productsName = createSaleDto.items.map((item) => item.name);
      const products = await this.productRepository.find({
        where: { name: In(productsName) },
      });

      if (products.length !== createSaleDto.items.length) {
        throw new NotFoundException(`One or more products were not found.`);
      }

      // Operaciones correspondientes para el header de la venta.
      const totalAmount = createSaleDto.items.reduce((acc, item) => {
        const product = products.find((product) => product.name === item.name);
        const quantity = item.quantity;
        return acc + product.price * quantity
      }, 0);
      const totalItems = products.length

      // Crear Venta

      const sale = this.saleRepository.create({
        ...createSaleDto,
        customer,
        totalAmount,
        totalItems,
        products,
      });

      // Actualizar el stock y contabilizar compras de clientes.
      await this.productService.updateStock(createSaleDto.items);
      await this.customerService.purchaseIncrease(customer);

      await this.saleRepository.save(sale);
      return sale;
    } catch (error) {
      throw error;
    }
  }

  async findAll( paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const totalSales = await this.saleRepository.count();
    const totalPages = Math.ceil(totalSales / limit);

    const data = await this.saleRepository.find({

      take: limit,
      skip: (page - 1) * limit,
      relations: {
        products: false,
      },
      select: {
        products: false,
      },
    });
    
    return {
      data,
      meta: {
        totalSales,
        totalPages,
        currentPage: page,
      },
    };
  }

  async findOne(id: string) {
    const sale = await this.saleRepository.findOne({
      where: {
        id,
      },
      relations: {
        products: true,
      },
    });
    if (!sale) {
      throw new NotFoundException(`Sale: ${id} not found`);
    }
    return sale;
  }

  async findByPaymentMethod(term: PaymentMethod ) {

    const sales = await this.saleRepository.find({
      where: { payment: term },
    });
    if (sales.length === 0) {
      throw new NotFoundException(`No sales found with payment method: ${term}`);
    }

    return sales
  }

  async findByDate(dateFilterDto: DateFilterDto ) {
    const { startDate, endDate } = dateFilterDto;

    const sales = await this.saleRepository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });
    
    const total = sales.reduce((acc, sale) => {
      return acc + parseFloat(sale.totalAmount as unknown as string);
    }, 0);
    
    if(sales.length === 0){ 
      throw new NotFoundException(`No sales found between ${startDate} and ${endDate}`);
    }
    return {
      data: sales,
      total
    };
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    const sale = await this.saleRepository.preload({
      id,
      ...updateSaleDto,
      customer: { fullname: updateSaleDto.customer },
    });
    await this.saleRepository.save(sale);
    return sale;
  }
}
