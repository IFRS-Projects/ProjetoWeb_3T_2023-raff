import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { enCrypt } from './../../../common/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await enCrypt(createUserDto.password);
    if (!createUserDto.email.endsWith('@aluno.feliz.ifrs.edu.br')) {
      throw new ForbiddenException('Email is not accepted');
    }
    return await this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findOne(email: string) {
    try {
      return await this.prisma.users.findUniqueOrThrow({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new NotFoundException('no users found');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      throw new ForbiddenException('email cannot be changed');
    }

    return await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    try {
      await this.prisma.users.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException('user cannot be found', 400);
    }

    return await this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
