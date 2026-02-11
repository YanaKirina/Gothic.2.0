import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository
            .createQueryBuilder('user')
            .addSelect('user.passwordHash')
            .where('user.email = :email', { email })
            .getOne();
    }

    async create(dto: CreateUserDto): Promise<User> {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(dto.password, saltRounds);

        const user = this.usersRepository.create({
            email: dto.email,
            name: dto.name,
            passwordHash
        })

        return await this.usersRepository.save(user);

    }

    async updateRole(id: number, dto: UpdateRoleDto): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } })

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        user.role = dto.role;

        return this.usersRepository.save(user);
    }
}