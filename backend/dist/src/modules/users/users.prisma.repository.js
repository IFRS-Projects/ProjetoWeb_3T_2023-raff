"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUsersRepository = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("./../../../common/utils/bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let PrismaUsersRepository = class PrismaUsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        createUserDto.password = await (0, bcrypt_1.enCrypt)(createUserDto.password);
        if (!createUserDto.email.endsWith('@aluno.feliz.ifrs.edu.br')) {
            throw new common_1.ForbiddenException('Email is not accepted');
        }
        return await this.prisma.users.create({
            data: createUserDto,
        });
    }
    async findAll() {
        return await this.prisma.users.findMany();
    }
    async findOne(email) {
        try {
            return await this.prisma.users.findUniqueOrThrow({
                where: {
                    email,
                },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('no users found');
        }
    }
    async update(id, updateUserDto) {
        if (updateUserDto.email) {
            throw new common_1.ForbiddenException('email cannot be changed');
        }
        return await this.prisma.users.update({
            where: { id },
            data: updateUserDto,
        });
    }
    async remove(id) {
        try {
            await this.prisma.users.findUniqueOrThrow({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            throw new common_1.HttpException('user cannot be found', 400);
        }
        return await this.prisma.users.delete({
            where: {
                id,
            },
        });
    }
};
exports.PrismaUsersRepository = PrismaUsersRepository;
exports.PrismaUsersRepository = PrismaUsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUsersRepository);
//# sourceMappingURL=users.prisma.repository.js.map