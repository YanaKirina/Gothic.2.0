import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from '../users/user.entity';
import { Product } from "@/products/product.entity";


@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @Column()
    userId: number

    @Column()
    productId: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.cartItems, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Product, (product) => product.cartItems, { onDelete: 'CASCADE' })
    product: Product;


}
