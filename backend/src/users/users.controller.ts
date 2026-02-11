import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto'
import { UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './role.enum';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';




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

  @ApiOperation({ summary: 'Обновить роль пользователя' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiProperty({
    enum: Role,
    example: Role.Admin,
  })
  @ApiBody({ type: UpdateRoleDto })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)

  @Patch(':id/role')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto
  ) {
    return this.usersService.updateRole(id, dto);
  }
}