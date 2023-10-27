import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { enCrypt } from 'common/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await enCrypt(createUserDto.password);
    if (!createUserDto.email.endsWith('@aluno.feliz.ifrs.edu.br')) {
      throw new HttpException('email is not accepted', 422);
    }
    return await this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findOne(email: string) {
    return await this.prisma.users.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      throw new HttpException('email cannot be changed', 422);
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
