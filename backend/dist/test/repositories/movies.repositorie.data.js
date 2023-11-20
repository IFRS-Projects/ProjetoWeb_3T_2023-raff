"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaMock = exports.fakeClassifedMovies = exports.fakeMovies = void 0;
exports.fakeMovies = [
    {
        created_at: '2023-10-31T22:53:22.085Z',
        description: 'movie desc',
        id: 'a9b2dd53-e2e4-472f-a13f-e60e74c5af5e',
        image_url: '',
        love_amount: 0,
        title: 'movie A',
        updated_at: '2023-10-31T22:53:05.075Z',
    },
    {
        created_at: '2023-10-31T22:53:22.085Z',
        description: 'movie desc',
        id: 'a9b2dd53-e2e4-472f-a13f-e60e74c5af3e',
        image_url: '',
        love_amount: 0,
        title: 'movie B',
        updated_at: '2023-10-31T22:53:05.075Z',
    },
    {
        created_at: '2023-10-31T22:53:22.085Z',
        description: 'movie desc',
        id: 'a9b2dd53-e2e4-472f-a13f-e60e77c5af3e',
        image_url: '',
        love_amount: 0,
        title: 'movie C',
        updated_at: '2023-10-31T22:53:05.075Z',
    },
];
exports.fakeClassifedMovies = [
    {
        created_at: '2023-10-31T22:53:22.085Z',
        description: 'movie desc',
        id: 'a9b2dd53-e2e4-472f-a13f-e60e74c5af5e',
        image_url: '',
        love_amount: 2,
        title: 'movie A',
        updated_at: '2023-10-31T22:53:05.075Z',
        user_likes: {
            id: 'a9b2dd53-e2e4-472f-a13f-e60e74c5afq2',
            moviesId: 'a9b2dd53-e2e4-472f-a13f-e60e74c5af5e',
        },
    },
    {
        created_at: '2023-10-31T22:53:22.085Z',
        description: 'movie desc',
        id: 'a9b2dd53-e2e4-472f-a13f-e60e74c5af3e',
        image_url: '',
        love_amount: -4,
        title: 'movie B',
        updated_at: '2023-10-31T22:53:05.075Z',
        user_likes: {
            id: 'a9b2dd53-e2e4-472f-a13f-e60e74c5af3e',
            moviesId: 'a9b2dd53-e2e4-472f-a13f-e60e74c5af5e',
        },
    },
    {
        created_at: '2023-10-31T22:53:22.085Z',
        description: 'movie desc',
        id: 'a9b2dd53-e2e4-472f-a13f-e60e77c5af3e',
        image_url: '',
        love_amount: '10',
        title: 'movie C',
        updated_at: '2023-10-31T22:53:05.075Z',
        user_likes: {
            id: 'a9b2dd53-e2e4-472f-a13f-e60tr4c5afq2',
            moviesId: 'a9b2dd53-e2e4-472f-a13f-e60e77c5af3e',
        },
    },
];
exports.prismaMock = {
    movies: {
        create: jest.fn().mockReturnValue(exports.fakeMovies[0]),
        findMany: jest.fn().mockResolvedValue(exports.fakeMovies),
        findUnique: jest.fn().mockResolvedValue(exports.fakeMovies[0]),
        update: jest.fn().mockResolvedValue(exports.fakeMovies[0]),
        findRank: jest.fn().mockResolvedValue(exports.fakeClassifedMovies),
        delete: jest.fn(),
    },
};
//# sourceMappingURL=movies.repositorie.data.js.map