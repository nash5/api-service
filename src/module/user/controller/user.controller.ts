import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from '../model/user.dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** This API is used to fetch the list of Users */
  @Get()
  find(): Promise<UserDTO[]> {
    return this.userService.find();
  }

  /** This API is used to get single user with UserId */
  @Get(':userId')
  findById(@Param('userId') user_id: string) {
    return this.userService.findById(user_id);
  }

  /** This API is used to create a user in a file */
  @Post()
  create(@Body() createUserDto: UserDTO): Promise<UserDTO> {
    return this.userService.create(createUserDto);
  }

  /** This API is used to update a user in a list */
  @Put()
  update(@Body() updateUserDto: UserDTO): Promise<UserDTO[]> {
    return this.userService.update(updateUserDto);
  }
}
