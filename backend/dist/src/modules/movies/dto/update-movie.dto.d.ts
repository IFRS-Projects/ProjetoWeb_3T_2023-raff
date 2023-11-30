import { CreateMovieDto } from './create-movie.dto';
declare const UpdateMovieDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMovieDto>>;
export declare class UpdateMovieDto extends UpdateMovieDto_base {
    love_amount?: number;
}
export {};
