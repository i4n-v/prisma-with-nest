import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BatchCreateUserDto } from './dto/batch-create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AffiliateUserDto } from './dto/affiliate-user.dto';

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

  @Post('batch/transaction')
  async createManyWithTransaction(@Body() body: BatchCreateUserDto) {
    const { users } = body;

    const createdUsers =
      await this.usersService.createManyWithTransaction(users);

    return createdUsers;
  }

  @Patch('affiliate-to')
  async affiliateTo(@Body() body: AffiliateUserDto) {
    const userWithAffiliateds = await this.usersService.affiliateTo(body);
    return userWithAffiliateds;
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

  @Get('raw')
  async findAllRaw() {
    const users = await this.usersService.findAllRaw();
    return users;
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

  @Get(':id/orders')
  async findOrders(@Param('id', new ParseUUIDPipe()) id: string) {
    const orders = await this.usersService.findOrders(id);
    return orders;
  }
}
