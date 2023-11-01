import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class FilesService {
  async create(file: Express.Multer.File, req: Request) {
    const fullUrl = req.protocol
      .concat('://')
      .concat(req.hostname)
      .concat(':4000');

    return new URL(`/img/${file.filename}`, fullUrl).toString();
  }

  // findAll() {
  //   return `This action returns all files`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} file`;
  // }

  // update(id: number, updateFileDto: UpdateFileDto) {
  //   return `This action updates a #${id} file`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} file`;
  // }
}
