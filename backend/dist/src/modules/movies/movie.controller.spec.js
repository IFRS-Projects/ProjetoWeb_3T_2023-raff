"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const movies_repositorie_data_1 = require("./../../../test/repositories/movies.repositorie.data");
const movie_prisma_service_1 = require("./movie.prisma.service");
const movies_repositorie_1 = require("./repository/movies.repositorie");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
describe('MovieService', () => {
    let service;
    let prisma;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                {
                    provide: movies_repositorie_1.MoviesRepository,
                    useClass: movie_prisma_service_1.PrismaMovieService,
                },
                { provide: prisma_service_1.PrismaService, useValue: movies_repositorie_data_1.prismaMock },
            ],
        }).compile();
        service = module.get(movies_repositorie_1.MoviesRepository);
        prisma = module.get(prisma_service_1.PrismaService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('findAll', () => {
        it(`should return an array of movies`, async () => {
            const response = await service.findAll('asd');
            expect(response).toEqual(movies_repositorie_data_1.fakeMovies);
            expect(prisma.movies.findMany).toHaveBeenCalledTimes(1);
            expect(prisma.movies.findMany).toHaveBeenCalledWith({
                where: {
                    user_likes: {
                        none: {
                            usersId: 'asd',
                        },
                    },
                },
            });
        });
    });
    describe('findRank', () => {
        it(`should return an array of movies when movie is classfied`, async () => {
            const r = await service.findRank();
            expect(r).toEqual(movies_repositorie_data_1.fakeClassifedMovies);
            expect(prisma.movies.findMany).toHaveBeenCalledTimes(1);
            expect(prisma.movies.findMany).toHaveBeenCalledWith({
                where: {
                    user_likes: {
                        some: {
                            moviesId: {
                                not: 'null',
                            },
                        },
                    },
                },
            });
        });
    });
    describe('findOne', () => {
        it('should return a single movie', async () => {
            const r = await service.findOne('a9b2dd53-e2e4-472f-a13f-e60e74c5af5e');
            expect(r).toEqual(movies_repositorie_data_1.fakeMovies[0]);
            expect(prisma.movies.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.movies.findUnique).toHaveBeenCalledWith({
                where: { id: 'a9b2dd53-e2e4-472f-a13f-e60e74c5af5e' },
            });
        });
        it('should not return a single movie', async () => {
            jest.spyOn(prisma.movies, 'findUnique').mockResolvedValue(undefined);
            const r = await service.findOne('a9b2dd53-e2e4-472f-a13f');
            expect(r).toBeUndefined();
            expect(prisma.movies.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.movies.findUnique).toHaveBeenCalledWith({
                where: { id: 'a9b2dd53-e2e4-472f-a13f' },
            });
        });
    });
    describe('create', () => {
        it(`should create a new movie`, async () => {
            const response = await service.create(movies_repositorie_data_1.fakeMovies[0]);
            expect(response).toBe(movies_repositorie_data_1.fakeMovies[0]);
            expect(prisma.movies.create).toHaveBeenCalledTimes(1);
            expect(prisma.movies.create).toHaveBeenCalledWith({
                data: movies_repositorie_data_1.fakeMovies[0],
            });
        });
    });
    describe('updateOne', () => {
        it(`should update a movie`, async () => {
            const response = await service.update('a9b2dd53-e2e4-472f-a13f-e60e74c5af5e', movies_repositorie_data_1.fakeMovies[0]);
            expect(response).toEqual(movies_repositorie_data_1.fakeMovies[0]);
            expect(prisma.movies.update).toHaveBeenCalledTimes(1);
            expect(prisma.movies.update).toHaveBeenCalledWith({
                where: { id: 'a9b2dd53-e2e4-472f-a13f-e60e74c5af5e' },
                data: movies_repositorie_data_1.fakeMovies[0],
            });
        });
        it(`should return NotFoundException when no movie is found`, async () => {
            const unexistingPost = {
                created_at: ':53:22.085Z',
                description: 'movie',
                id: 'a9b2dd53-e2e4-e',
                image_url: 'http://imagem.com/1',
                love_amount: 10000,
                title: '5 noites com frederico',
                updated_at: '',
            };
            jest.spyOn(prisma.movies, 'update').mockRejectedValue(new Error());
            try {
                await service.update('a9b2dd53-e2e4-e', unexistingPost);
            }
            catch (error) {
                expect(error).toEqual(new common_1.NotFoundException('Movie not found'));
            }
            expect(prisma.movies.update).toHaveBeenCalledWith({
                where: { id: 'a9b2dd53-e2e4-e' },
                data: unexistingPost,
            });
        });
    });
    describe('deleteOne', () => {
        it('should be able to delete a movie and return a empty body', async () => {
            expect(await service.remove('a9b2dd53-e2e4-472f-a13f-e60e74c5af3e')).toBeUndefined();
            expect(prisma.movies.delete).toBeCalledTimes(1);
            expect(prisma.movies.delete).toBeCalledWith({
                where: { id: 'a9b2dd53-e2e4-472f-a13f-e60e74c5af3e' },
            });
        });
        it('should to return a NotFoundException if movie does not exists', async () => {
            jest
                .spyOn(prisma.movies, 'delete')
                .mockRejectedValue(new common_1.NotFoundException());
            try {
                await service.remove('99');
            }
            catch (error) {
                expect(error).toEqual(new common_1.NotFoundException());
            }
            expect(prisma.movies.delete).toBeCalledTimes(1);
            expect(prisma.movies.delete).toBeCalledWith({
                where: {
                    id: '99',
                },
            });
        });
    });
});
//# sourceMappingURL=movie.controller.spec.js.map