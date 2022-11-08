import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { UserFollows } from './userFollows.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  hash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserFollows, (followedUser) => followedUser.followedUser)
  followedUsers: UserFollows[];
}
