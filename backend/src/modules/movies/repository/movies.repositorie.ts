import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';

export abstract class MoviesRepository {
  abstract create(createMovieDto: CreateMovieDto);
  abstract findAll();
  abstract findOne(id: string);
  abstract update(id: string, updateMovieDto: UpdateMovieDto);
  abstract remove(id: string);
}
