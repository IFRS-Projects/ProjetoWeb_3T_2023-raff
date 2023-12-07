import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Permission } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const requiredPermission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const userPermissions = await this.prismaService.users.findUnique({
        where: { id: payload.sub },
        select: { permissions: true },
      });

      const hasPermission = userPermissions.permissions.includes(
        Permission[requiredPermission],
      );

      if (!hasPermission) {
        console.log(userPermissions);

        console.log('permission not found');

        throw new UnauthorizedException();
      }
      request['user'] = payload;
    } catch (err) {
      console.log('algum outro erro', err);

      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.cookies?.token;
  }
}
