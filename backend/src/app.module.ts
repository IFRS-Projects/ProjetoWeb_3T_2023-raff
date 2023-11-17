import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [UsersModule, AuthModule, FilesModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
