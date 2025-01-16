import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { Supplier } from './entities/supplier.entity';
import { SuppliersService } from './suppliers.service';

import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo Proveedor' })
  @ApiResponse({ status: 201, description: 'Proveedor creado exitosamente', type: Supplier })
  @ApiResponse({ status: 400, description: 'Error en el envio de datos' })
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos los Proveedores' })
  @ApiResponse({ status: 200, description: 'Lista de Proveedores', type: [Supplier] })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.suppliersService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiOperation({ summary: 'Busca un Proveedor por su ID o nombre' })
  @ApiResponse({ status: 200, description: 'Proveedor encontrado', type: Supplier })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  findOne(@Param('term') term: string) {
    return this.suppliersService.findOne(term);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza un Proveedor' })
  @ApiResponse({ status: 200, description: 'Proveedor actualizado', type: Supplier })
  @ApiResponse({ status: 400, description: 'Error en el envio de datos' })
  @ApiResponse({ status: 500, description: 'Error interno-Asegurarse de que el ID es un UUID valido' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSupplierDto: UpdateSupplierDto
  ) {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un Proveedor' })
  @ApiResponse({ status: 200, description: 'Proveedor eliminado' })
  @ApiResponse({ status: 400, description: 'Se espera un UUID' })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' }) 
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.suppliersService.remove(id);
  }
}
