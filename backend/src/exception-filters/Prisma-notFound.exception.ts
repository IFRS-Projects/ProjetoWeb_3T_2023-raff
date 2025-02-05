import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse<Response>();

    const messageError = exception.meta?.cause ?? exception.message;
    exception.code === 'P2025'
      ? res.status(404).json({
          statusCode: 404,
          message: messageError,
        })
      : res.status(500).json({
          statusCode: 500,
          message: messageError,
        });
  }
}
