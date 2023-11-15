import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaUsersRepository } from './users.prisma.repository';
import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';

@Module({
  controllers: [UsersController],
  imports: [NestjsFormDataModule.config({ storage: MemoryStoredFile })],
  providers: [
    {
      provide: UsersService,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
