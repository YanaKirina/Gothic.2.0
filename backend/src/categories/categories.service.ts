import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Product } from '@/products/product.entity';


@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) { }

    findAll(): Promise<Category[]> {
        return this.categoriesRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        const category = await this.categoriesRepository.findOne({
            where: {id},
        })

        if (!category){
            throw new NotFoundException(`Category with id ${id} not found`);
        }

        return category
    }

    async create(dto: CreateCategoryDto): Promise<Category> {
        const category = this.categoriesRepository.create({
            name: dto.name,
            slug: dto.slug,
        })
        return await this.categoriesRepository.save(category);
    }

    async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
        const category = await this.categoriesRepository.preload({
            id,
            ...dto,
        });
         if (!category) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }
        return this.categoriesRepository.save(category);
    }

    async remove(id: number): Promise<void> { 
        const category = await this.findOne(id);
        await this.categoriesRepository.remove(category);
     }

    async findProducts(id: number): Promise<Product[]>  {
        const category = await this.categoriesRepository.findOne({
            where: {id},
            relations: ['products']
        });

        if (!category){
            throw new NotFoundException(`Category with id ${id} not found`);
        }

        return category.products
    }
}
