import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists.',
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const { email, password } = createUserDto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const newUser = await this.userService.createUser(email, password);

    const userDto: UserDto = {
      id: newUser.id,
      email: newUser.email,
      password: newUser.password,
    };

    return userDto;
  }
}
