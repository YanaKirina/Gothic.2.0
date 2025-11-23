import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
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
}
