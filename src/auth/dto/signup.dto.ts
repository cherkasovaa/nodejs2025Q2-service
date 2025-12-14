import { IsNotEmpty, IsString } from 'class-validator';

export class SignupAuthDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
