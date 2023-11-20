export class Movie {
  public id: string;
  public title: string;
  public description: string;
  public love_amount: number;
  public image_url: string;
  public created_at: Date;
  public updated_at: Date;

  constructor(movie: Partial<Movie>) {
    Object.assign(this, movie);
  }
}
