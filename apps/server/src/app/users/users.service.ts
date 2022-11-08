import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UserFollows } from './models/userFollows.entity';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserFollows)
    private userFollowsRepository: Repository<UserFollows>
  ) {}

  findAll(): Observable<UserEntity[]> {
    try {
      return from(this.usersRepository.find());
    } catch (err) {
      console.error(err);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({
        id,
      });
      if (!user) throw new NotFoundException();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersRepository
        .createQueryBuilder()
        .update(updateUserDto)
        .where({ id })
        .returning('*')
        .execute();
      return updatedUser.raw.at(0);
      // const updatedUser = await this.usersRepository.update(id, updateUserDto);
      // return updatedUser;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string) {
    try {
      await this.usersRepository.delete(id);
      return { message: 'Deleted user' };
    } catch (err) {
      throw err;
    }
  }

  async followUser(userId: string, userToFollowId: string) {
    try {
      const user = await this.findOne(userId);
      const userToFollow = await this.findOne(userToFollowId);
      console.log(user, userToFollow);
      const userFollows = await this.userFollowsRepository.save({
        user,
        followedUser: userToFollow,
      });
      return userFollows;
    } catch (err) {
      throw err;
    }
  }
}
