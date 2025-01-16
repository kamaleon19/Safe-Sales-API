import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}


  @Post()
  @ApiOperation({ summary: 'Crea un nuevo Cliente' })
  @ApiResponse({ status: 201, description: 'El cliente ha sido creado exitosamente', type: Customer })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes', type: [Customer] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.customersService.findAll( paginationDto );
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca clientes por termino de busqueda' })
  @ApiResponse({ status: 200, description: 'Lista de clientes que coinciden con el termino de busqueda', type: [Customer] })
  @ApiResponse({ status: 404, description: 'No se encontraron clientes' })
  @ApiQuery({ name: 'term', required: false, type: String })
  searchProducts(@Query('term') term : string ){
    return this.customersService.findBySearch(term || '')
  }

  @Get(':term')
  @ApiOperation({ summary: 'Obtiene un cliente por ID o nombre' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado', type: Customer })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  findOne(@Param('term') term: string) {
    return this.customersService.findOne(term);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza un cliente' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado', type: Customer })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
    ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un cliente' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
