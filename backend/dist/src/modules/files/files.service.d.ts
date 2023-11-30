import { Request } from 'express';
export declare class FilesService {
    create(file: Express.Multer.File, req: Request): Promise<string>;
}
