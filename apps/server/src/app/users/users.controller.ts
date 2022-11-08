import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './models/user.entity';
import { Observable } from 'rxjs';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { FollowUserDto } from './dto/follow-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    console.log(this.usersService.findAll());
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtGuard)
  @Post('/follow')
  followUser(@Body() followUserDto: FollowUserDto) {
    return this.usersService.followUser(
      followUserDto.userId,
      followUserDto.userToFollowId
    );
  }
}
