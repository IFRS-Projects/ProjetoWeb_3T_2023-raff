import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repository/movies.repositorie';
import { PrismaService } from '../prisma/prisma.service';
export declare class PrismaMovieService implements MoviesRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMovieDto & {
        image_url: string;
    }): Promise<{
        id: string;
        title: string;
        description: string;
        love_amount: number;
        image_url: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        love_amount: number;
        image_url: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        love_amount: number;
        image_url: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findRank(): Promise<{
        id: string;
        title: string;
        description: string;
        love_amount: number;
        image_url: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    update(id: string, updateMovieDto: UpdateMovieDto): Promise<{
        id: string;
        title: string;
        description: string;
        love_amount: number;
        image_url: string;
        created_at: Date;
        updated_at: Date;
    }>;
    createLike(userId: string, movieId: string): Promise<void>;
    remove(id: string): Promise<void>;
}
