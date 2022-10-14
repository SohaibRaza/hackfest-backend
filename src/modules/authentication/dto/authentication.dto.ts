import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthenticationDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;
}
