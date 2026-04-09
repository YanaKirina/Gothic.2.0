import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./cart.entity";
import { Repository } from "typeorm";
import { AddToCartDto } from "./dto/add-to-cart.dto";
import { Product } from "@/products/product.entity";

type CartItemResponse = {
    productId: number;
    title: string;
    price: number;
    quantity: number;
    subtotal: number;
    isActive: boolean;
    availableStock: number;
    isAvailable: boolean;
};

type CartResponse = {
  items: CartItemResponse[];
  total: number;
};

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,

        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) { }

    async findCart(userId: number) {
        const items = await this.cartRepository.find({
            where: {
                user: { id: userId },
            },
            relations: ['product'],
        });

        let total = 0

        const result: CartItemResponse[] = [];
        for (const item of items) {
            const subtotal = item.product.price * item.quantity;
            const isAvailable =item.product.isActive && item.product.stock >= item.quantity;

            if (isAvailable) {
                total += subtotal;
            }


            result.push({
                productId: item.product.id,
                title: item.product.title,
                price: item.product.price,
                quantity: item.quantity,
                subtotal: subtotal,
                isActive: item.product.isActive,
                availableStock: item.product.stock,
                isAvailable: isAvailable,
            });
        }
        return {
            items: result,
            total: total,

        };
    }

    async addItem(userId: number, dto: AddToCartDto) {
        const product = await this.productsRepository.findOne({
            where: { id: dto.productId }
        })
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        if (!product.isActive) {
            throw new BadRequestException('Product is not available');
        }

        const existingItem = await this.cartRepository.findOne({
            where: {
                user: { id: userId },
                product: { id: dto.productId },
            },
        });


        if (existingItem) {
            const newQuantity = existingItem.quantity + dto.quantity;

            if (newQuantity > product.stock) {
                throw new BadRequestException('Not enough stock');
            }

            existingItem.quantity = newQuantity;
            return this.cartRepository.save(existingItem);
        }

        if (dto.quantity > product.stock) {
            throw new BadRequestException('Not enough stock');
        }

        const cartItem = this.cartRepository.create({
            quantity: dto.quantity,
            user: { id: userId },
            product: { id: dto.productId },
        });

        return this.cartRepository.save(cartItem);
    }

}