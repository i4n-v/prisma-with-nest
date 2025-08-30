import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(user: CreateUserDto) {
    return this.prisma.user.create({
      data: user,
    });
  }

  createMany(user: CreateUserDto[]) {
    return this.prisma.user.createManyAndReturn({
      data: user,
    });
  }
}
