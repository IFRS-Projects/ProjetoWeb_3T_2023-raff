import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
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
    FilesService,
  ],
})
export class MoviesModule {}
