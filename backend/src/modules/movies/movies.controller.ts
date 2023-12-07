import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repository/movies.repositorie';
import { FilesService } from '../files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '../files/multer-config';
import { Request } from 'express';
import { UserId } from './../../../common/decorator/get-user-id.decorator';

// @UseGuards(AuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesRepository,
    private readonly fileService: FilesService,
  ) {}

  // @HasPermission('MASTER')
  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    console.log(createMovieDto);
    const image_url = await this.fileService.create(file, req);
    const newDto = { ...createMovieDto, image_url };
    return await this.moviesService.create(newDto);
  }

  // @HasPermission('MEMBER')
  @Get('/')
  async findAll(@UserId() userId: string) {
    return await this.moviesService.findAll(userId);
  }

  // @HasPermission('MASTER')
  @Get('/rank')
  async findRank() {
    return await this.moviesService.findRank();
  }

  // @HasPermission('MASTER')
  @Get('/rank/high')
  async findHigh() {
    return await this.moviesService.highLoved();
  }

  // @HasPermission('MASTER')
  @Get('/rank/low')
  async findLow() {
    return await this.moviesService.lowLoved();
  }

  // @HasPermission('MASTER')
  @Get('/list')
  async list() {
    return await this.moviesService.list();
  }

  // @HasPermission('MASTER')
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.moviesService.findOne(id);
  }

  // @HasPermission('MEMBER')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @UserId() userId: string,
  ) {
    let newDto = { ...updateMovieDto, image_url: '' };
    if (!userId) {
      throw new UnauthorizedException('User not logged');
    }
    if (file) {
      const image_url = await this.fileService.create(file, req);
      newDto = { ...updateMovieDto, image_url };
    }

    if (newDto.image_url === '') {
      delete newDto.image_url;
    }

    if (updateMovieDto.love_amount) {
      await this.moviesService.createLike(userId, id);
      return await this.moviesService.update(id, {
        ...updateMovieDto,
        love_amount: Number(updateMovieDto.love_amount),
      });
    }
    return await this.moviesService.update(id, {
      ...newDto,
    });
  }

  // @HasPermission('MASTER')
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.moviesService.remove(id);
  }

  @Get('/rank/user/')
  async userRank(@UserId() userId: string) {
    return await this.moviesService.userRank(userId);
  }
}
