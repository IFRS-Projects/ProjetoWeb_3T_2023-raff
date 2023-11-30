import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
export declare abstract class MoviesRepository {
    abstract create(createMovieDto: CreateMovieDto): any;
    abstract findAll(user_id: string): any;
    abstract findOne(id: string): any;
    abstract findRank(): any;
    abstract createLike(userId: string, movieId: string): any;
    abstract update(id: string, updateMovieDto: UpdateMovieDto): any;
    abstract remove(id: string): any;
}
