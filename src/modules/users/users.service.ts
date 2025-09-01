import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AffiliateUserDto } from './dto/affiliate-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(user: CreateUserDto) {
    return this.prisma.user.create({
      data: user,
    });
  }

  affiliateTo(data: AffiliateUserDto) {
    return this.prisma.user.update({
      data: {
        afilliatedId: data.user_id,
      },
      where: {
        id: data.affiliate_id,
      },
      include: {
        afilliatedTo: true,
      },
    });
  }

  update(id: string, user: UpdateUserDto) {
    return this.prisma.user.update({
      data: user,
      where: {
        id,
      },
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  createMany(users: CreateUserDto[]) {
    return this.prisma.user.createManyAndReturn({
      data: users,
    });
  }

  async createManyWithTransaction(users: CreateUserDto[]) {
    const createdUsers: User[] = [];

    await this.prisma.$transaction(async (transaction) => {
      for (const user of users) {
        const createdUser = await transaction.user.create({
          data: user,
        });

        createdUsers.push(createdUser);
      }
    });

    return createdUsers;
  }

  findMany() {
    return this.prisma.user.findMany({
      include: {
        profile: true,
        orders: true,
        afilliateds: true,
        afilliatedTo: true,
      },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        orders: true,
        afilliateds: true,
        afilliatedTo: true,
      },
    });
  }

  async findStats() {
    const stats = await this.prisma.user.aggregate({
      _count: { email: true, _all: true },
      _max: { age: true },
      _min: { age: true },
      _avg: { age: true },
    });

    return {
      stats: {
        totalUsers: stats._count._all,
        totalEmails: stats._count.email,
        oldestUser: stats._max.age,
        youngestUser: stats._min.age,
        averageAge: stats._avg.age ? Math.round(stats._avg.age) : 0,
      },
    };
  }

  findAllRaw() {
    return this.prisma.$queryRaw<User[]>`
      SELECT * FROM users
    `;
  }

  findOrders(id: string) {
    return this.prisma.order.findMany({
      where: {
        userId: id,
      },
      include: {
        products: true,
      },
    });
  }
}
