import { Controller, Get, Post, Body, Patch, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Expense } from './entities/expense.entity';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Create un nuevo gasto' })
  @ApiResponse({ status: 201, description: 'El gasto ha sido creado exitosamente', type: Expense })
  @ApiResponse({ status: 400, description: 'Error en el envio de datos' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los gastos' })
  @ApiResponse({ status: 200, description: 'Lista de gastos', type: [Expense] })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.expensesService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiOperation({ summary: 'Obtener un gasto por ID o nombre' })
  @ApiResponse({ status: 200, description: 'Gasto encontrado', type: Expense })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado' })
  findOne(@Param('term') id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un gasto' })
  @ApiResponse({ status: 200, description: 'Gasto actualizado', type: Expense })
  @ApiResponse({ status: 400, description: 'Error en el envio de datos' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateExpenseDto: UpdateExpenseDto
  ) {
    return this.expensesService.update(id, updateExpenseDto);
  }

}
