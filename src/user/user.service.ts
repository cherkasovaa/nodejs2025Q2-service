import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private db: PrismaService;
  private salt: number;

  constructor(private prisma: PrismaService) {
    this.db = this.prisma;
    this.salt = parseInt(process.env.CRYPT_SALT) || 10;
  }

  private async mapToUserEntity(user: any): Promise<User> {
    return plainToInstance(User, {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    });
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, this.salt);

    const dbUser = await this.db.user.create({
      data: {
        ...rest,
        password: hashedPassword,
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

  async findByLogin(login: string) {
    const user = await this.db.user.findFirst({ where: { login } });

    if (!user) {
      throw new NotFoundException('The user is not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.db.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('The user is not found');
    }

    const isPasswordValid = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(
      updateUserDto.newPassword,
      this.salt,
    );

    const updatedUser = await this.db.user.update({
      where: { id },
      data: {
        password: hashedPassword,
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
