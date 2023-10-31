import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  @MinLength(3)
  public name: string;

  @IsDefined()
  @IsEmail()
  email: string;

  public password: string;
}
