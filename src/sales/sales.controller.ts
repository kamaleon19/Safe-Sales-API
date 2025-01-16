import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Query } from '@nestjs/common';

import { SalesService } from './sales.service';

import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { DateFilterDto } from './dto/date-filter.dto';

import { PaymentMethod } from './enums';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Sale } from './entities/sale.entity';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Genera una venta' })
  @ApiResponse({ status: 201, description: 'Venta creada exitosamente', type: Sale })
  @ApiResponse({ status: 400, description: 'Error en el envio de datos' })
  @ApiResponse({ status: 404, description: 'Cliente o Producto no encontrado' })
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas las ventas' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number }) 
  findAll(@Query() paginationDto: PaginationDto) {
    return this.salesService.findAll(paginationDto);
  }

  @Get('payment')
  @ApiOperation({ summary: 'Lista todas las ventas por metodo de pago' })
  @ApiResponse  ({ status: 200, description: 'Lista de ventas por metodo de pago indicado', type: [Sale] })
  @ApiResponse  ({ status: 404, description: 'No se encontraron ventas con el medio de pago indicado' })
  @ApiQuery({ name: 'term', required: true, enum: PaymentMethod })
  findByPaymentMethod(@Query('term') term: PaymentMethod) {
    return this.salesService.findByPaymentMethod(term)
  }


  @Get('sales-by-date')
  @ApiOperation({ summary: 'Filtra todas las ventas por fecha' })
  @ApiResponse({ status: 200, description: 'Lista de ventas por fecha indicada', type: [Sale] })
  @ApiResponse({ status: 404, description: 'No se encontraron ventas en el rango de fechas indicado' })
  @ApiQuery({ name: 'endDate', required: true, type: Date })  
  @ApiQuery({ name: 'startDate', required: true, type: Date })
  findByDate(@Query() dateFilterDto: DateFilterDto) {
    return this.salesService.findByDate(dateFilterDto);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Busca una venta por ID' })
  @ApiResponse({ status: 200, description: 'Venta encontrada', type: Sale })
  @ApiResponse({ status: 400, description: 'Se espera un UUID valido' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.salesService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza una venta' })
  @ApiResponse({ status: 200, description: 'Venta actualizada', type: Sale })
  @ApiResponse({ status: 400, description: 'Error en el envio de datos' })
  @ApiResponse({ status: 500, description: 'Error interno-Asegurarse de que el ID es un UUID valido' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(id, updateSaleDto);
  }

}
