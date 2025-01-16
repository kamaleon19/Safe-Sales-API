import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { validate as IsUUID } from 'uuid';

import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

import { CommonService } from 'src/common/common.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,

    private readonly commonService: CommonService,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    try {
      const product = this.supplierRepository.create(createSupplierDto);
      await this.supplierRepository.save(product);

      return product;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const totalSuppliers = await this.supplierRepository.count({ where: { status: true } });
    const totalPages = Math.ceil(totalSuppliers / limit);

    const suppliers = await this.supplierRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      where: { status: true },
    });

    return {
      data: suppliers,
      meta: {
        totalSuppliers,
        totalPages,
        currentPage: page,
      },
    };
  }

  async findOne(term: string) {
    let supplier: Supplier;

    if (IsUUID(term)) {
      supplier = await this.supplierRepository.findOneBy({ id: term, status: true });
    }else{
     supplier = await this.supplierRepository.findOne({ where: { name: term, status: true } });
    }


    if (!supplier) {
      throw new NotFoundException(`Supplier: ${term} not found.`);
    }
    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {

    const supplier = await this.supplierRepository.preload({ id, ...updateSupplierDto})
    await this.supplierRepository.save(supplier)
    return supplier

  }

  async remove(id: string) {

    const supplier = await this.findOne(id)
    await this.supplierRepository.update(supplier.id, {status: false}) 

    return{
      message: `Supplier removed.`
    }

  }
}
