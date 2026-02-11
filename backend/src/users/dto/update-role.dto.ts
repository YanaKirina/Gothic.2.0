import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../user.entity';

export class UpdateRoleDto {
  @ApiProperty({
    enum: Role,
    example: Role.Admin,
  })
  @IsEnum(Role)
  role: Role;
}
