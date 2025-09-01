import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

class CreateOrderProductDto {
  @IsNotEmpty({ message: 'Product id is required.' })
  @IsUUID('all', { message: 'Product id should be a uuid' })
  id: string;

  @IsNotEmpty({ message: 'Quantity is required.' })
  @IsNumber({}, { message: 'Quantity should be a number.' })
  quantity: number;
}

export { CreateOrderProductDto };
