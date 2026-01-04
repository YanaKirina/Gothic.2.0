import { IsNotEmpty,  IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Платья', description: 'Название категории' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'dresses', description: 'Слаг категории для URL' })
    slug: string;
}
