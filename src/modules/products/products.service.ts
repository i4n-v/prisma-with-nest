import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(product: CreateProductDto) {
    return this.prisma.product.create({
      data: product,
    });
  }

  update(id: string, product: UpdateProductDto) {
    return this.prisma.product.update({
      data: product,
      where: {
        id,
      },
    });
  }

  delete(id: string) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  findMany() {
    return this.prisma.product.findMany();
  }
}
