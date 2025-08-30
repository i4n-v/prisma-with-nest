import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BatchCreateUserDto } from './dto/batch-create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const createdUser = await this.usersService.create(body);

    return createdUser;
  }

  @Post('batch')
  async createMany(@Body() body: BatchCreateUserDto) {
    const { users } = body;

    const createdUsers = await this.usersService.createMany(users);

    return createdUsers;
  }
}
