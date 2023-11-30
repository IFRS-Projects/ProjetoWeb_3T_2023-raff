/// <reference types="@types/jest" />
export declare const fakeMovies: {
    created_at: string;
    description: string;
    id: string;
    image_url: string;
    love_amount: number;
    title: string;
    updated_at: string;
}[];
export declare const fakeClassifedMovies: ({
    created_at: string;
    description: string;
    id: string;
    image_url: string;
    love_amount: number;
    title: string;
    updated_at: string;
    user_likes: {
        id: string;
        moviesId: string;
    };
} | {
    created_at: string;
    description: string;
    id: string;
    image_url: string;
    love_amount: string;
    title: string;
    updated_at: string;
    user_likes: {
        id: string;
        moviesId: string;
    };
})[];
export declare const prismaMock: {
    movies: {
        create: jest.Mock<any, any, any>;
        findMany: jest.Mock<any, any, any>;
        findUnique: jest.Mock<any, any, any>;
        update: jest.Mock<any, any, any>;
        findRank: jest.Mock<any, any, any>;
        delete: jest.Mock<any, any, any>;
    };
};
