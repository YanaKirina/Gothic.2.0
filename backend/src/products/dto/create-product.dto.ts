import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Красное платье', description: 'Название товара' })
    title: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 1999, description: 'Цена товара в рублях' })
    price: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 1, description: 'ID категории, к которой относится товар' })
    categoryId: number;

    @IsNumber()
    @Min(0)
    @ApiProperty({ example: 10, description: 'Количество товара на складе' })
    stock: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Легкое летнее платье', required: false })
    description?: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ example: true, required: false })
    isActive?: boolean;
}
