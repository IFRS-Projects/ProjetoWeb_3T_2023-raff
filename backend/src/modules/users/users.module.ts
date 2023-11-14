import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from './../../prisma.service';
import { PrismaUsersRepository } from './users.prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService,
      useClass: PrismaUsersRepository,
    },
    PrismaService,
  ],
})
export class UsersModule {}
