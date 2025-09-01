import { IsNotEmpty, IsString } from 'class-validator';

class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name should be a string.' })
  name: string;
}

export { CreateProductDto };
