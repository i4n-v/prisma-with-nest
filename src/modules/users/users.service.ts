import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(user: CreateUserDto) {
    return this.prisma.user.create({
      data: user,
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

  createMany(user: CreateUserDto[]) {
    return this.prisma.user.createManyAndReturn({
      data: user,
    });
  }

  findMany() {
    return this.prisma.user.findMany();
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
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
}
