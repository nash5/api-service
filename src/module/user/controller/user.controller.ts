import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from '../model/user.dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  find(): Promise<UserDTO[]> {
    return this.userService.find();
  }

  @Get(':userId')
  findById(@Param('userId') user_id: string) {
    return this.userService.findById(user_id);
  }

  @Post()
  create(@Body() createUserDto: UserDTO): Promise<UserDTO> {
    return this.userService.create(createUserDto);
  }

  @Put()
  update(@Body() updateUserDto: UserDTO): Promise<UserDTO[]> {
    return this.userService.update(updateUserDto);
  }
}
