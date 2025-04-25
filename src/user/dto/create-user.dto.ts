import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthday: string;

  @IsString()
  identification: string;
}