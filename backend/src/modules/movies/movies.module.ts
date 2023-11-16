import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { PrismaMovieService } from './movie.prisma.service';
import { MoviesRepository } from './repository/movies.repositorie';
import { FilesService } from '../files/files.service';
import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';

@Module({
  imports: [NestjsFormDataModule.config({ storage: MemoryStoredFile })],
  controllers: [MoviesController],
  providers: [
    {
      provide: MoviesRepository,
      useClass: PrismaMovieService,
    },
    FilesService,
  ],
})
export class MoviesModule {}
