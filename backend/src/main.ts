<<<<<<< HEAD
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
    allowedHeaders: '*',
  });

  await app.listen(4000);
}
bootstrap();
=======
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
// import { PrismaUniqueKeyDupExceptionFilter } from './exception-filters/Prisma-UniqueKeyDup.exception';
// import { PrismaNotFoundExceptionFilter } from './exception-filters/Prisma-notFound.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }),
  );
  // app.useGlobalFilters(new PrismaUniqueKeyDupExceptionFilter(httpAdapter));
  // app.useGlobalFilters(new PrismaNotFoundExceptionFilter());

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
    allowedHeaders: '*',
  });

  await app.listen(4000);
}
bootstrap();
>>>>>>> RaffDv/issue15
