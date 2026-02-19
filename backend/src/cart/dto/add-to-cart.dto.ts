import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ example: 1, description: 'ID продукта' })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 2, description: 'Количество товара' })
  @IsInt()
  @Min(1)
  quantity: number;
}
