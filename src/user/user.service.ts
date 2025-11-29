import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  create(createUserDto: CreateUserDto) {
    const timestamp = Date.now();

    const user = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.db.users.push(user);

    return this.toResponse(user);
  }

  findAll() {
    return this.db.users.map((user) => this.toResponse(user));
  }

  findOne(id: string) {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.toResponse(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    this.db.users = this.db.users.map((user) => {
      if (user.id === id) {
        if (updateUserDto.oldPassword !== user.password) {
          throw new ForbiddenException('The old password is wrong');
        }

        const password = updateUserDto.newPassword;
        const updatedAt = Date.now();

        return {
          ...user,
          password,
          version: user.version++,
          updatedAt,
        };
      }

      return user;
    });

    return this.findOne(id);
  }

  remove(id: string) {
    const toBeRemoved = this.findOne(id);

    this.db.users = this.db.users.filter((user) => user.id !== id);

    return toBeRemoved;
  }

  private toResponse(user: User) {
    const { password, ...rest } = user;

    return rest;
  }
}
