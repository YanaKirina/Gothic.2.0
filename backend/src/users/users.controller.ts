import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';



@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: any) {
    return req.user;
  }



  @ApiOperation({ summary: 'Создать аккаунт' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}