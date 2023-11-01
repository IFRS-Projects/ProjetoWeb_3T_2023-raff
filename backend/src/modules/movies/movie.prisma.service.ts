import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from './../../prisma.service';
import { MoviesRepository } from './repository/movies.repositorie';

@Injectable()
export class PrismaMovieService implements MoviesRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMovieDto & { image_url: string }) {
    return await this.prisma.movies.create({
      data: dto,
    });
  }
  async findAll() {
    return await this.prisma.movies.findMany();
  }
  async findOne(id: string) {
    try {
      return await this.prisma.movies.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Movie not found');
    }
  }
  async update(id: string, updateMovieDto: UpdateMovieDto) {
    try {
      return await this.prisma.movies.update({
        where: { id },
        data: updateMovieDto,
      });
    } catch (error) {
      throw new NotFoundException('Movie not found');
    }
  }
  async remove(id: string) {
    try {
      await this.prisma.movies.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
