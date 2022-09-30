import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { UserEntity } from '../users/models/user.entity';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private dataSource: DataSource) {}

  async signToken(userId: string, email: string) {
    const token = await this.jwtService.signAsync({ userId, email });
    return token;
  }

  async signup(dto: AuthDto) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, salt);

    try {
      const user = await this.dataSource.manager.save(UserEntity, {
        userName: dto.userName,
        hash,
      });

      return {
        message: 'Successfully created user',
        token: await this.signToken(user.id, user.userName),
      };
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    try {
      const user = await this.dataSource.manager.findOne(UserEntity, {
        where: { userName: dto.userName },
      });
      if (!user) throw new NotFoundException('User does not exist.');

      const pwMatches = await bcrypt.compare(dto.password, user.hash);
      if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

      return {
        message: 'Successfully connected user',
        token: await this.signToken(user.id, user.userName),
      };
    } catch (err) {
      throw err;
    }
  }
}
