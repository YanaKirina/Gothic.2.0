import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';


export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Черное платье', description: 'Название товара' })
    title: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 1000, description: 'Цена товара в рублях' })
    price: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 1, description: 'ID категории, к которой относится товар' })
    categoryId: number;
}