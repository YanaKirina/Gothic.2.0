import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '@/categories/category.entity';


@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) { }

    findAll(categoryId?: number): Promise<Product[]> {
        const options: any = {
            relations: ['category'],
        };

        if (categoryId !== undefined) {
            options.where = { categoryId };
        }

        return this.productsRepository.find(options);
    }


    async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['category'],
        });

        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        return product;
    }

    async create(dto: CreateProductDto): Promise<Product> {
        const category = await this.categoriesRepository.findOne({
            where: { id: dto.categoryId }
        })

        if (!category) {
            throw new NotFoundException(`Category with id ${dto.categoryId} not found`);
        }

        const product = this.productsRepository.create({
            title: dto.title,
            price: dto.price,
            category
        })
        return await this.productsRepository.save(product);
    }

    async update(id: number, dto: UpdateProductDto): Promise<Product> {
        const product = await this.productsRepository.findOne({ where: { id } });

        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        if (dto.title !== undefined) {
            product.title = dto.title;
        }

        if (dto.price !== undefined) {
            product.price = dto.price;
        }

        if (dto.categoryId !== undefined) {
            const category = await this.categoriesRepository.findOne({
                where: { id: dto.categoryId },
            });

            if (!category) {
                throw new NotFoundException(
                    `Category with id ${dto.categoryId} not found`,
                );
            }

            product.category = category;
            product.categoryId = category.id;
        }

        return this.productsRepository.save(product);
    }

    async remove(id: number): Promise<void> {
        const product = await this.findOne(id);
        await this.productsRepository.remove(product);
    }

}

