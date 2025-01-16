import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';

import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo Producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: Product })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [Product] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll( paginationDto );
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca productos por termino de busqueda' })
  @ApiResponse({ status: 200, description: 'Lista de productos que coincidan con el termino de busqueda', type: [Product] })
  @ApiResponse({ status: 404, description: 'No se encontraron productos' })
  @ApiQuery({ name: 'term', required: false, type: String })
  searchProducts(@Query('term') term : string ){
    return this.productsService.findBySearch(term || '')
  }

  @Get(':term')
  @ApiOperation({ summary: 'Busca un producto por su ID o nombre' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Product })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado', type: Product })
  @ApiResponse({ status: 400, description: 'Error en el envio de datos' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto ) {
    return this.productsService.update(id , updateProductDto);
  }
  

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
  
}
