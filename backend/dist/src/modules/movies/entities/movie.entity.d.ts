export declare class Movie {
    id: string;
    title: string;
    description: string;
    love_amount: number;
    image_url: string;
    created_at: Date;
    updated_at: Date;
    constructor(movie: Partial<Movie>);
}
