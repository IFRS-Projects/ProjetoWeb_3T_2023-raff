import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { enCrypt } from './../../../common/utils/bcrypt';
import { UserId } from 'common/decorator/get-user-id.decorator';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @FormDataRequest()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('/')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch()
  @FormDataRequest()
  async update(@UserId() id: string, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await enCrypt(updateUserDto.password);
    }
    return this.usersService.update(id, updateUserDto);
  }

  @HttpCode(204)
  @Delete('/')
  remove(@UserId() id: string) {
    return this.usersService.remove(id);
  }
}
