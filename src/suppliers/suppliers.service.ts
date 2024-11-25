import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { validate as IsUUID } from 'uuid';

import { Supplier } from './entities/supplier.entity';
import { CommonService } from 'src/common/common.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
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
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.supplierRepository.find({
      take: limit,
      skip: offset,
    });

    return products;
  }

  async findOne(term: string) {
    let supplier: Supplier;

    if (IsUUID(term)) {
      supplier = await this.supplierRepository.findOneBy({ id: term });
    }else{
     supplier = await this.supplierRepository.findOneBy({ name: term });
    }


    if (!supplier) {
      throw new BadRequestException(`Supplier: ${term} not found.`);
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
    await this.supplierRepository.remove(supplier)

    return{
      message: `Supplier removed.`
    }

  }
}
