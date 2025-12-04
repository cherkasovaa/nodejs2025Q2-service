import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private db: PrismaService;

  constructor(private prisma: PrismaService) {
    this.db = this.prisma;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.db.album.create({
      data: {
        ...createAlbumDto,
      },
    });
    return album;
  }

  async findAll() {
    return await this.db.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.db.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('The album is not found');
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.db.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('The album is not found');
    }

    return await this.db.album.update({
      where: { id },
      data: {
        ...updateAlbumDto,
      },
    });
  }

  async remove(id: string) {
    const toBeRemoved = await this.db.album.findUnique({ where: { id } });

    if (!toBeRemoved) {
      throw new NotFoundException('The album is not found');
    }

    await this.db.album.delete({ where: { id } });

    return toBeRemoved;
  }
}
