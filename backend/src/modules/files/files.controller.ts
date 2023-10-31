import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import { Request } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async upload(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const createdFile = await this.filesService.create(file);

    const fullUrl = req.protocol.concat('://').concat(req.hostname);
    return new URL(`/files/${createdFile.filename}`, fullUrl).toString();
  }
}
