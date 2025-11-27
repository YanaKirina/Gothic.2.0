import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';


@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @ApiOperation({ summary: 'Получить список товаров (с фильтром по категории)' })
    @ApiQuery({
        name: 'categoryId',
        required: false,
        type: Number,
        description: 'ID категории для фильтрации товаров',
    })
    @Get()
    findAll(
        @Query('categoryId') categoryId?: string,
    ): Promise<Product[]> {
        const parsedCategoryId = categoryId ? Number(categoryId) : undefined;
        return this.productsService.findAll(parsedCategoryId);
    }

    @ApiOperation({ summary: 'Получить товар по ID' })
    @ApiParam({ name: 'id', description: 'ID товара', example: 1 })
    @ApiResponse({ status: 200, description: 'Товар найден' })
    @ApiResponse({ status: 404, description: 'Товар не найден' })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @ApiOperation({ summary: 'Создать новый товар' })
    @ApiBody({ type: CreateProductDto })
    @ApiResponse({ status: 201, description: 'Товар успешно создан' })
    @ApiResponse({ status: 400, description: 'Неверные данные' })
    @Post()
    create(@Body() dto: CreateProductDto): Promise<Product> {
        return this.productsService.create(dto)
    }


    @ApiOperation({ summary: 'Обновить товар' })
    @ApiParam({ name: 'id', description: 'ID товара', example: 1 })
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({ status: 200, description: 'Товар обновлён' })
    @ApiResponse({ status: 404, description: 'Товар не найден' })
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProductDto,
    ): Promise<Product> {
        return this.productsService.update(id, dto)
    }

    @ApiOperation({ summary: 'Удалить товар' })
    @ApiParam({ name: 'id', description: 'ID товара', example: 1 })
    @ApiResponse({ status: 200, description: 'Товар удалён' })
    @ApiResponse({ status: 404, description: 'Товар не найден' })
    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number) {
        return this.productsService.remove(id);
    }
}
