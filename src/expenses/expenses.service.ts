import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import {validate as IsUUID} from 'uuid'

import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Injectable()
export class ExpensesService {

  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>
  ){}
  async create(createExpenseDto: CreateExpenseDto) {

    try {

      const expense = this.expenseRepository.create(createExpenseDto)
      await this.expenseRepository.save(expense)

      if(expense.status !== 'PAGADO'){
        delete expense.paidAt
      }

      return expense

    } catch (error) {
      throw new Error(error)
    }
  }

  // TO DO: Implementar filtro por fechas.

  async findAll( paginationDto: PaginationDto ) { 

    const { limit, page } = paginationDto

   const totalExpenses = await this.expenseRepository.count()
   const totalPages = Math.ceil(totalExpenses / limit)

   const expenses = await this.expenseRepository.find({
    take : limit,
    skip : (page - 1) * limit,
   })

    expenses.map( expense => {
      if(expense.status !== 'PAGADO'){
        delete expense.paidAt
      }
    })

    return {
      data: expenses,
      meta: {
        totalExpenses,
        totalPages,
        currentPage: page
      } 
    }
  }

  async findOne(term: string) { 

    let expense : Expense

    if(IsUUID(term)){
       expense = await this.expenseRepository.findOneBy({ id: term })
    }else{
      expense = await this.expenseRepository.findOneBy({ name: term })
    }
    if(!expense){
      throw new NotFoundException(`Expense: ${term} not found.`)
    }

    if(expense.status !== 'PAGADO'){
      delete expense.paidAt
    }
    return expense
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) { 

    const expense = await this.expenseRepository.preload({ id, ...updateExpenseDto })
    await this.expenseRepository.save(expense)
    return expense

  }

}
