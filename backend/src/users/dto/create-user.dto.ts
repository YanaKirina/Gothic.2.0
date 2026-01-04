import { IsNotEmpty,  IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsersController{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
    name: string;

    
}