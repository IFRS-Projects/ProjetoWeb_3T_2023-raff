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
exports.PrismaMovieService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PrismaMovieService = class PrismaMovieService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return await this.prisma.movies.create({
            data: dto,
        });
    }
    async findAll(id) {
        return await this.prisma.movies.findMany({
            where: {
                user_likes: {
                    none: {
                        usersId: id,
                    },
                },
            },
            orderBy: {
                love_amount: 'desc',
            },
        });
    }
    async findOne(id) {
        try {
            return await this.prisma.movies.findUnique({
                where: { id },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('Movie not found');
        }
    }
    async findRank() {
        return await this.prisma.movies.findMany({
            where: {
                user_likes: {
                    some: {
                        moviesId: {
                            not: 'null',
                        },
                    },
                },
            },
            orderBy: {
                love_amount: 'desc',
            },
        });
    }
    async update(id, updateMovieDto) {
        try {
            if (updateMovieDto.love_amount) {
                if (updateMovieDto.love_amount === 1 ||
                    updateMovieDto.love_amount === -1) {
                    const { love_amount, ...rest } = updateMovieDto;
                    console.log(love_amount);
                    return await this.prisma.movies.update({
                        where: { id },
                        data: {
                            love_amount: {
                                increment: love_amount,
                            },
                            ...rest,
                        },
                    });
                }
                else {
                    throw new common_1.UnprocessableEntityException('Value of LOVE_AMOUNT is not 1 or -1');
                }
            }
            return await this.prisma.movies.update({
                where: { id },
                data: updateMovieDto,
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async createLike(userId, movieId) {
        try {
            const UserLikedSomeMovie = (await this.prisma.user_likes.count({
                where: {
                    moviesId: movieId,
                    AND: {
                        usersId: userId,
                    },
                },
            })) > 0;
            if (UserLikedSomeMovie) {
                throw new common_1.UnauthorizedException('User already rated this movie');
            }
            await this.prisma.user_likes.create({
                data: {
                    usersId: userId,
                    moviesId: movieId,
                },
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.prisma.movies.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
};
exports.PrismaMovieService = PrismaMovieService;
exports.PrismaMovieService = PrismaMovieService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaMovieService);
//# sourceMappingURL=movie.prisma.service.js.map