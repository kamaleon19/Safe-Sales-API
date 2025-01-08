import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Like, Repository } from 'typeorm';
import { validate as IsUUID } from 'uuid'

import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { CommonService } from 'src/common/common.service';
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
        skip: offset,
        where: { status: true}  
      })
      
      return customers
  }

  async findOne(term: string) {

    let customer : Customer

      if(IsUUID(term)){
         customer = await this.customerRepository.findOneBy({ id: term, status: true})
      }else{
         customer = await this.customerRepository.findOne({ where : { fullname: term, status: true}}) 
      }
      if(!customer){
        throw new BadRequestException(`Customer: ${term} not found.`)
      }
      return customer
  }


  async findBySearch(term: string){
    const customers = await this.customerRepository.find({
      where: [
        { fullname: Like(`%${term}%`), status: true }
      ]
    })
    if(customers.length === 0){
      throw new BadRequestException(`Customer: ${term} not found.`)
    }

    return customers
    }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.preload({ id, ...updateCustomerDto})
    await this.customerRepository.save(customer)
    return customer
  }


  async purchaseIncrease(customer: Customer){
   customer.purchases += 1
   await this.customerRepository.save(customer)
  }

  async remove(id: string) {  
    const customer = await this.findOne(id)
    await this.customerRepository.update(customer.id, { status: false})
    return{
      status: 200,
      message: 'Customer deleted.',
    }
  }
}
