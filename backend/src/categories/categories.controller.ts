import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Product } from '@/products/product.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @ApiOperation({ summary: 'Получить список категорий' })
    @ApiResponse({ status: 200, description: 'Список категорий успешно получен' })
    @Get()
    findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @ApiOperation({ summary: 'Получить категорию по ID' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 200, description: 'Категория найдена' })
    @ApiResponse({ status: 404, description: 'Категория не найдена' })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return this.categoriesService.findOne(id)
    }

    @ApiOperation({ summary: 'Создать новую категорию' })
    @ApiBody({ type: CreateCategoryDto })
    @ApiResponse({ status: 201, description: 'Категория создана' })
    @ApiResponse({ status: 400, description: 'Неверные данные' })
    @Post()
    create(@Body() dto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(dto)
    }

    @ApiOperation({ summary: 'Обновить категорию' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiBody({ type: UpdateCategoryDto })
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCategoryDto,
    ): Promise<Category> {
        return this.categoriesService.update(id, dto);
    }


    @ApiOperation({ summary: 'Удалить категорию' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 200, description: 'Категория удалена' })
    @ApiResponse({ status: 404, description: 'Категория не найдена' })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.remove(id)
    }

    @ApiOperation({ summary: 'Получить товары категории' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 200, description: 'Товары категории найдены' })
    @ApiResponse({ status: 404, description: 'Категория не найдена' })
    @Get(':id/products')
    findProducts(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Product[]> {
        return this.categoriesService.findProducts(id)
    }
}
