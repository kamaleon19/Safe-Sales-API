import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { validate as IsUUID } from "uuid";

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {

  private readonly logger = new Logger('Product Service')

  constructor(
    @InjectRepository( Product)
    private readonly productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {

    try {

      const product = await this.productRepository.create( createProductDto )
      await this.productRepository.save( product )
      return product

    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  async findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0} = paginationDto

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
    })
    return products

  }

  async findOne(term: string) {
    
    let product : Product

    if(IsUUID(term)){
      product = await this.productRepository.findOneBy({ id: term })
    }else{

      const queryBuilder = this.productRepository.createQueryBuilder('prod')
      product = await queryBuilder
        .where('UPPER(name) =:name',{
          name: term.toUpperCase(),
        })
        .getOne()
    }

    if(!product){
      throw new NotFoundException(`Product with ${term} not found.`)
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private handleDbExceptions( error: any){
    if(error.code === '23505'){
      throw new BadRequestException(error.detail)
    }
    this.logger.error(error)
    throw new InternalServerErrorException('Algo salio mal.')
  }
}
