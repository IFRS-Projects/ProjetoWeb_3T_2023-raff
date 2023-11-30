import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';

export abstract class MoviesRepository {
  abstract create(createMovieDto: CreateMovieDto);
  abstract findAll(user_id: string);
  abstract findOne(id: string);
  abstract findRank();
  abstract createLike(userId: string, movieId: string);
  abstract update(id: string, updateMovieDto: UpdateMovieDto);
  abstract remove(id: string);
  abstract list();
  abstract highLoved();
  abstract lowLoved();
}
