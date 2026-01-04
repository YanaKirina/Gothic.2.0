import { IsNotEmpty,  IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({example: 'password123', description: 'Пароль (минимум 6 символов)'})
    password: string
}