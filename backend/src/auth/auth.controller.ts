import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Войти по логину' })
  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto){
    return this.authService.login(dto)
  }
}
