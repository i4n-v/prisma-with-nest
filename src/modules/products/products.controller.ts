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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    const createdProduct = await this.productsService.create(body);
    return createdProduct;
  }

  @Get()
  async findMany() {
    const users = await this.productsService.findMany();
    return users;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProductDto,
  ) {
    const updatedProduct = await this.productsService.update(id, body);
    return updatedProduct;
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedProduct = await this.productsService.delete(id);
    return deletedProduct;
  }
}
