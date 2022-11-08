import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UserFollows } from './models/userFollows.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserFollows])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
