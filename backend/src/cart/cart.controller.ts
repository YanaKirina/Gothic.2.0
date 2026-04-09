import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { AddToCartDto } from './dto/add-to-cart.dto';

@ApiTags('Cart')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    findCart(@Req() req){
        return this.cartService.findCart(req.user.sub)
    }

    @Post('items')
    addItem(
        @Req() req: any,
        @Body() dto: AddToCartDto,
    ){
        return this.cartService.addItem(req.user.sub, dto);
    }

}
