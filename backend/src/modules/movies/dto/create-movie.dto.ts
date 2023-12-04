<<<<<<< HEAD
import { IsDefined, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsDefined()
  @IsString()
  public title: string;

  @IsDefined()
  @IsString()
  public description: string;
}
=======
export class CreateMovieDto {
  public title: string;
  public description: string;
}
>>>>>>> RaffDv/issue15
