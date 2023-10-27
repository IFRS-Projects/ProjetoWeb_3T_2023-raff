import { IsDefined, IsString } from 'class-validator';

export class signInDto {
  @IsString()
  @IsDefined()
  public email: string;

  @IsString()
  @IsDefined()
  public password: string;
}
