import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';

class BatchCreateUserDto {
  @IsNotEmpty({ message: 'Users are required.' })
  @ValidateNested({ each: true, message: 'Users should be an array.' })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}

export { BatchCreateUserDto };
