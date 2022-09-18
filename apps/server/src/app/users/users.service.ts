import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    try {
      const newUser = this.usersRepository.save(createUserDto);
      return newUser;
    } catch (err) {
      console.error(err);
    }
  }

  findAll(): Promise<User[]> {
    try {
      return this.usersRepository.find();
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
}
