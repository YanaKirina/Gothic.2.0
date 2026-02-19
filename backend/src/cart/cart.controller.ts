import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { AddToCartDto } from './dto/add-to-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('jwt'))
    @Post('items')
    addItem(
        @Req() req: any,
        @Body() dto: AddToCartDto,
    ){
        return this.cartService.addItem(req.user.sub, dto);
    }
}
