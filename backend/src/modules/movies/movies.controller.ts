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
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repository/movies.repositorie';
import { FilesService } from '../files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '../files/multer-config';
import { Request } from 'express';
import { UserId } from 'common/decorator/get-user-id.decorator';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesRepository,
    private fileService: FilesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const image_url = await this.fileService.create(file, req);
    const newDto = { ...createMovieDto, image_url };
    return await this.moviesService.create(newDto);
  }

  @Get('/')
  async findAll(@UserId() userId: string) {
    return await this.moviesService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.moviesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.moviesService.remove(id);
  }
}
