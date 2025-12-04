import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private db = this.prisma; // Using PrismaService as DbService

  private mapToUserEntity(user: any): User {
    return plainToInstance(User, {
      ...user,
      createdAt:
        user.createdAt instanceof Date
          ? user.createdAt.getTime()
          : user.createdAt,
      updatedAt:
        user.updatedAt instanceof Date
          ? user.updatedAt.getTime()
          : user.updatedAt,
    });
  }

  create(createUserDto: CreateUserDto) {
    const dbUser = this.db.user.create({
      data: {
        ...createUserDto,
        version: 1,
      },
    });

    this.mapToUserEntity(dbUser);
  }

  async findAll() {
    const dbUsers = await this.db.user.findMany();
    return dbUsers.map((user) => this.mapToUserEntity(user));
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return this.mapToUserEntity(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.db.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException();
    }

    const updatedUser = await this.db.user.update({
      where: { id },
      data: {
        password: updateUserDto.newPassword,
        version: { increment: 1 },
      },
    });

    return this.mapToUserEntity(updatedUser);
  }

  async remove(id: string) {
    const toBeRemoved = await this.findOne(id);

    await this.db.user.delete({ where: { id } });

    return toBeRemoved;
  }
}
