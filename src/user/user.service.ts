import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private db: PrismaService;
  constructor(private prisma: PrismaService) {
    this.db = this.prisma;
  }

  private async mapToUserEntity(user: any): Promise<User> {
    return plainToInstance(User, {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
      // createdAt:
      //   user.createdAt instanceof Date
      //     ? user.createdAt.getTime()
      //     : user.createdAt,
      // updatedAt:
      //   user.updatedAt instanceof Date
      //     ? user.updatedAt.getTime()
      //     : user.updatedAt,
    });
  }

  async create(createUserDto: CreateUserDto) {
    const dbUser = await this.db.user.create({
      data: {
        ...createUserDto,
        version: 1,
      },
    });

    return await this.mapToUserEntity(dbUser);
  }

  async findAll() {
    const dbUsers = await this.db.user.findMany();
    return await Promise.all(dbUsers.map((user) => this.mapToUserEntity(user)));
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('The user is not found');
    }

    return await this.mapToUserEntity(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.db.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('The user is not found');
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

    return await this.mapToUserEntity(updatedUser);
  }

  async remove(id: string) {
    const toBeRemoved = await this.db.user.findUnique({ where: { id } });

    if (!toBeRemoved) {
      throw new NotFoundException('The user is not found');
    }

    await this.db.user.delete({ where: { id } });

    return await this.mapToUserEntity(toBeRemoved);
  }
}
