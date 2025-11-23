import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { CreateCategoryDto } from "./create-category.dto";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
        @IsString()
        @IsNotEmpty()
        @ApiProperty({ example: 'Платья', description: 'Название категории' })
        name: string;

        @IsString()
        @IsNotEmpty()
        @ApiProperty({ example: 'dresses', description: 'Слаг категории для URL' })
        slug: string;
}