import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ILike, Repository } from 'typeorm';
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

      const { limit, page } = paginationDto

      const totalCustomers = await this.customerRepository.count({ where : { status: true }})  
      const totalPages = Math.ceil(totalCustomers / limit)
        
      const customers = await this.customerRepository.find({
        take: limit,
        skip: (page - 1) * limit,
        where: { status: true }
      })
      
      return {
        data: customers,
        meta: {
          totalCustomers,
          totalPages,
          currentPage: page
        }
      }
  }

  async findOne(term: string) {

    let customer : Customer

      if(IsUUID(term)){
         customer = await this.customerRepository.findOneBy({ id: term, status: true})
      }else{
         customer = await this.customerRepository.findOne({ where : { fullname: term, status: true}}) 
      }
      if(!customer){
        throw new NotFoundException(`Customer: ${term} not found.`)
      }
      return customer
  }


  async findBySearch(term: string){
    
    const customers = await this.customerRepository.find({
      where: [
        { fullname: ILike(`%${term}%`), status: true }
      ]
    })
    if(customers.length === 0){
      throw new NotFoundException(`Customer: ${term} not found.`)
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
