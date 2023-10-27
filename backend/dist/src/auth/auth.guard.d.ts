import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private jwtService;
    private prismaService;
    constructor(reflector: Reflector, jwtService: JwtService, prismaService: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
