import { Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateProductDto): Promise<Product>  {
        return this.productsService.create(dto)
    }

}
