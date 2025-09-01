import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create({ products, ...order }: CreateOrderDto) {
    const productsToConnect = products.map((product) => ({
      quantity: product.quantity,
      product: {
        connect: {
          id: product.id,
        },
      },
    }));

    return this.prisma.order.create({
      data: {
        ...order,
        products: {
          create: productsToConnect,
        },
      },
      include: {
        products: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    });
  }

  update(id: string, product: UpdateOrderDto) {
    return this.prisma.order.update({
      data: product,
      where: {
        id,
      },
    });
  }

  delete(id: string) {
    return this.prisma.order.delete({
      where: {
        id,
      },
    });
  }

  findMany() {
    return this.prisma.order.findMany({
      include: {
        products: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    });
  }
}
