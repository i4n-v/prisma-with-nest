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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BatchCreateUserDto } from './dto/batch-create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Get()
  async findMany() {
    const users = await this.usersService.findMany();
    return users;
  }

  @Get('stats')
  async findStats() {
    const stats = await this.usersService.findStats();
    return stats;
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findById(id);
    return user;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, body);
    return user;
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.delete(id);
    return user;
  }
}
