import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { validate as IsUUID } from 'uuid'

import { Customer } from './entities/customer.entity';
import { CommonService } from 'src/common/common.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository : Repository<Customer>,

    private readonly commonService : CommonService,
  ){}

  async create(createCustomerDto: CreateCustomerDto) {

    try {

      const customer = this.customerRepository.create(createCustomerDto)
      await this.customerRepository.save(customer)
      return customer

    } catch (error) {
      this.commonService.handleDBExceptions(error)
    }

  }

  async findAll( paginationDto: PaginationDto) {

      const { limit = 10, offset = 0} = paginationDto

      const customers = await this.customerRepository.find({
        take: limit,
        skip: offset
      })

      return customers
  }

  async findOne(term: string) {

    let customer : Customer

      if(IsUUID(term)){
         customer = await this.customerRepository.findOneBy({ id: term})
      }else{
         customer = await this.customerRepository.findOneBy({ fullname: term})
      }
      if(!customer){
        throw new BadRequestException(`Customer: ${term} not found.`)
      }
      return customer
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.preload({ id, ...updateCustomerDto})
    await this.customerRepository.save(customer)
    return customer
  }

  async remove(id: string) {
    const customer = await this.findOne(id)
    await this.customerRepository.remove( customer )
    return{
      message: 'Customer deleted.',
      customer
    }
  }
}
