import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name should be a string.' })
  name: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email is not valid.' })
  email: string;

  @IsOptional()
  @IsNumber({}, { message: 'Age should be a number.' })
  age?: number;
}

export { CreateUserDto };
