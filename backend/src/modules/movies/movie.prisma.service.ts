<<<<<<< HEAD
import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repository/movies.repositorie';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaMovieService implements MoviesRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMovieDto & { image_url: string }) {
    return await this.prisma.movies.create({
      data: dto,
    });
  }
  async findAll(id: string) {
    return await this.prisma.movies.findMany({
      where: {
        user_likes: {
          none: {
            usersId: id,
          },
        },
      },
      orderBy: {
        love_amount: 'desc',
      },
    });
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

  async findRank() {
    return await this.prisma.movies.findMany({
      where: {
        user_likes: {
          some: {
            moviesId: {
              not: 'null',
            },
          },
        },
      },
      orderBy: {
        love_amount: 'desc',
      },
    });
  }
  async update(id: string, updateMovieDto: UpdateMovieDto) {
    try {
      if (updateMovieDto.love_amount) {
        if (
          updateMovieDto.love_amount === 1 ||
          updateMovieDto.love_amount === -1
        ) {
          const { love_amount, ...rest } = updateMovieDto;
          console.log(love_amount);
          return await this.prisma.movies.update({
            where: { id },
            data: {
              love_amount: {
                increment: love_amount,
              },
              ...rest,
            },
          });
        } else {
          throw new UnprocessableEntityException(
            'Value of LOVE_AMOUNT is not 1 or -1',
          );
        }
      }

      return await this.prisma.movies.update({
        where: { id },
        data: updateMovieDto,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createLike(userId: string, movieId: string) {
    try {
      const UserLikedSomeMovie: boolean =
        (await this.prisma.user_likes.count({
          where: {
            moviesId: movieId,
            AND: {
              usersId: userId,
            },
          },
        })) > 0;
      if (UserLikedSomeMovie) {
        throw new UnauthorizedException('User already rated this movie');
      }
      await this.prisma.user_likes.create({
        data: {
          usersId: userId,
          moviesId: movieId,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
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
=======
import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repository/movies.repositorie';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaMovieService implements MoviesRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMovieDto & { image_url: string }) {
    return await this.prisma.movies.create({
      data: dto,
    });
  }
  async findAll(id: string) {
    return await this.prisma.movies.findMany({
      where: {
        user_likes: {
          none: {
            usersId: id,
          },
        },
      },
      orderBy: {
        love_amount: 'desc',
      },
    });
  }

  async list() {
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

  async findRank() {
    return await this.prisma.movies.findMany({
      where: {
        user_likes: {
          some: {
            moviesId: {
              not: 'null',
            },
          },
        },
      },
      orderBy: {
        love_amount: 'desc',
      },
    });
  }
  async update(id: string, updateMovieDto: UpdateMovieDto) {
    try {
      if (updateMovieDto.love_amount) {
        if (
          updateMovieDto.love_amount === 1 ||
          updateMovieDto.love_amount === -1
        ) {
          const { love_amount, ...rest } = updateMovieDto;
          console.log(love_amount);
          return await this.prisma.movies.update({
            where: { id },
            data: {
              love_amount: {
                increment: love_amount,
              },
              ...rest,
            },
          });
        } else {
          throw new UnprocessableEntityException(
            'Value of LOVE_AMOUNT is not 1 or -1',
          );
        }
      }

      return await this.prisma.movies.update({
        where: { id },
        data: updateMovieDto,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createLike(userId: string, movieId: string) {
    try {
      const UserLikedSomeMovie: boolean =
        (await this.prisma.user_likes.count({
          where: {
            moviesId: movieId,
            AND: {
              usersId: userId,
            },
          },
        })) > 0;
      if (UserLikedSomeMovie) {
        throw new UnauthorizedException('User already rated this movie');
      }
      await this.prisma.user_likes.create({
        data: {
          usersId: userId,
          moviesId: movieId,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async remove(id: string) {
    const r = await this.prisma.movies.findUnique({
      where: {
        id,
      },
    });
    console.log(r);

    return await this.prisma.movies.delete({ where: { id } });
  }
}
>>>>>>> RaffDv/issue15
