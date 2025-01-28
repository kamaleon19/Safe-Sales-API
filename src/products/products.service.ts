import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ILike, Repository } from 'typeorm';
import { validate as IsUUID } from "uuid";

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { SaleItemsDto } from 'src/sales/dto/sale-items.dto';
import { CommonService } from 'src/common/common.service';



@Injectable()
export class ProductsService {

  private readonly logger = new Logger('Product Service')

  constructor(
    @InjectRepository( Product )
    private readonly productRepository: Repository<Product>,

    private readonly commonService: CommonService
  ){}

  async create(createProductDto: CreateProductDto) {

    try {

      const product = this.productRepository.create( createProductDto )
      await this.productRepository.save( product )
      return product

    } catch (error) {
      this.commonService.handleDBExceptions(error)
    }
  }

  async findAll( paginationDto: PaginationDto ) {

    const { limit , page } = paginationDto

    const totalProducts = await this.productRepository.count({ where : { available: true }})
    const totalPages = Math.ceil( totalProducts / limit)

    const products = await this.productRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      where: { available: true }
    })

    return {
      data: products,
      meta: {
        totalProducts,
        totalPages,
        currentPage: page
      }
    }

  }

  async findOne(term: string) {
    
    let product : Product 

    if(IsUUID(term)){
      product = await this.productRepository.findOneBy({ id: term, available: true})
    }else{
      product = await this.productRepository.findOne({ where : { name: term, available: true}})
    }

    if(!product){
      throw new NotFoundException(`Product with ${term} not found.`)
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.productRepository.preload({ id, ...updateProductDto })
    await this.productRepository.save(product)
    return product

  }


  async remove(id: string) {

    const product = await this.findOne( id )
    await this.productRepository.update(product.id, { available: false })
    return {
      status: 200,
      message: 'Product deleted successfully'
    }
    
  }


  async findBySearch(term: string){
    const products = await this.productRepository.find({
      where: { name : ILike(`%${term}%`), available: true}
    })

    if(products.length === 0){
      throw new NotFoundException(`No products found with term: ${term}`)
    }
    return products
    }



  async updateStock(saleItemsDto: SaleItemsDto[]){
    
    for(const item of saleItemsDto){
      const product = await this.productRepository.findOne({
        where : { name : item.name}
      })

      if(!product){
        throw new NotFoundException(`Product not found: ${item.name}`)
      }
      if(product.stock < item.quantity){
        throw new BadRequestException(`Insufficient stock for product: ${product.name}`)
      }

      product.stock -= item.quantity
      await this.productRepository.save(product)

    }

  } 
}
