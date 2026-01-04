import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({example: 'password123', description: 'Пароль (минимум 6 символов)'})
    password: string;
}