import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Создать аккаунт' })
      @ApiBody({ type: CreateUserDto })
  @Post('register')
  register(@Body() dto: CreateUserDto){
    return this.usersService.create(dto);
  }
}