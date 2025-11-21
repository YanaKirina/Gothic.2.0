import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';


@Injectable()
export class ProductsService {
    private products: Product[] = [
        { id: 1, title: 'Test product 1', price: 100 },
        { id: 2, title: 'Test product 2', price: 200 },
    ];

    findAll(): Product[] {
        return this.products;
    }

    findOne(id: number): Product {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    create(dto: CreateProductDto): Product {
        const newProduct: Product = {
            id: this.products.length + 1, 
            title: dto.title,
            price: dto.price,
        };
        this.products.push(newProduct);
        return newProduct;
    }
}

