import { IsOptional, IsNumber } from 'class-validator';

class UpdateOrderDto {
  @IsOptional()
  @IsNumber({}, { message: 'Value should be a number' })
  value?: number;
}

export { UpdateOrderDto };
