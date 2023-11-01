import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { PrismaService } from './../../prisma.service';
import { PrismaMovieService } from './movie.prisma.service';
import { MoviesRepository } from './repository/movies.repositorie';
import { FilesService } from '../files/files.service';

@Module({
  controllers: [MoviesController],
  providers: [
    {
      provide: MoviesRepository,
      useClass: PrismaMovieService,
    },
    PrismaService,
    FilesService,
  ],
})
export class MoviesModule {}
