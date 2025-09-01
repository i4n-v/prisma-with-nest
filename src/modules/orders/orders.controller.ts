import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async create(@Body() body: CreateOrderDto) {
    const createdOrder = await this.ordersService.create(body);
    return createdOrder;
  }

  @Get()
  async findMany() {
    const users = await this.ordersService.findMany();
    return users;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateOrderDto,
  ) {
    const updatedOrder = await this.ordersService.update(id, body);
    return updatedOrder;
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedOrder = await this.ordersService.delete(id);
    return deletedOrder;
  }
}
