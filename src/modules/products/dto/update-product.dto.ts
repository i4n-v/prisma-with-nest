import { IsOptional, IsString } from 'class-validator';

class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Name should be a string.' })
  name?: string;
}

export { UpdateProductDto };
