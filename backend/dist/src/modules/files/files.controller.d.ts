import { FilesService } from './files.service';
import { Request } from 'express';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    upload(file: Express.Multer.File, req: Request): Promise<string>;
}
