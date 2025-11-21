import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';


@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) { }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

   async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id },
        });

        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        return product;
    }

    async create(dto: CreateProductDto): Promise<Product> {
        const product = this.productsRepository.create({
            title: dto.title,
            price: dto.price,
        })
        return await this.productsRepository.save(product);
    }
}

