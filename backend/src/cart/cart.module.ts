import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Product } from '@/products/product.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Product]),
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
