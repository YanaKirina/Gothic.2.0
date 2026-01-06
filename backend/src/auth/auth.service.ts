import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email)
        if (!user) {
            throw new UnauthorizedException();
        }

        const isPasswordValid = await bcrypt.compare(
            dto.password,
            user.passwordHash
        )

        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }

        return user;
    }
}

