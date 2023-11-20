import { IsDefined, IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsDefined()
  public email: string;

  @IsString()
  @IsDefined()
  public password: string;
}
