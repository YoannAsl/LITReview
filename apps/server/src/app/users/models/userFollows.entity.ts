import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserFollows {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, {
    /*cascade: true,*/ onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.followedUsers, {
    onDelete: 'CASCADE',
    // cascade: true,
  })
  followedUser: UserEntity;
}
