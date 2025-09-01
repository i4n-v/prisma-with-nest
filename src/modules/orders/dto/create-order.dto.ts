import { IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';
import { Type } from 'class-transformer';

class CreateOrderDto {
  @IsNotEmpty({ message: 'Value is required.' })
  @IsNumber({}, { message: 'Value should be a number' })
  value: number;

  @IsNotEmpty({ message: 'User id is required.' })
  @IsUUID('all', { message: 'User id should be a uuid' })
  userId: string;

  @IsNotEmpty({ message: 'Products are required.' })
  @ValidateNested({ each: true, message: 'Products should be an array.' })
  @Type(() => CreateOrderProductDto)
  products: CreateOrderProductDto[];
}

export { CreateOrderDto };
