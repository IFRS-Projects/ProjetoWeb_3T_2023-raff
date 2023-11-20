import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { PrismaUsersRepository } from '../users/users.prisma.repository';
import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600000s' },
    }),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  providers: [
    AuthService,
    {
      provide: UsersService,
      useClass: PrismaUsersRepository,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
