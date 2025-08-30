import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name should be a string.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email is not valid.' })
  email?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Age should be a number.' })
  age?: number;

  @IsOptional()
  @IsBoolean({ message: 'isActive should be a boolean.' })
  isActive?: boolean;
}

export { UpdateUserDto };
