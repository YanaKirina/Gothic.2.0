import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async create(dto: CreateUserDto): Promise<User>{
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(dto.password, saltRounds);

        const user = this.usersRepository.create({
            email: dto.email,
            name: dto.name,
            passwordHash
        })

        return await this.usersRepository.save(user);
 
    }
}