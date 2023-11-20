import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repository/movies.repositorie';
import { FilesService } from '../files/files.service';
import { Request } from 'express';
export declare class MoviesController {
    private readonly moviesService;
    private readonly fileService;
    constructor(moviesService: MoviesRepository, fileService: FilesService);
    create(createMovieDto: CreateMovieDto, file: Express.Multer.File, req: Request): Promise<any>;
    findAll(userId: string): Promise<any>;
    findRank(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateMovieDto: UpdateMovieDto, userId: string): Promise<any>;
    remove(id: string): Promise<any>;
}
