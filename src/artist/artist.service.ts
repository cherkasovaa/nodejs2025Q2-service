import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  private db: PrismaService;

  constructor(private prisma: PrismaService) {
    this.db = this.prisma;
  }

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.db.artist.create({
      data: {
        ...createArtistDto,
      },
    });
    return artist;
  }

  async findAll() {
    return await this.db.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.db.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('The artist is not found');
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.db.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('The artist is not found');
    }

    const updatedArtist = await this.db.artist.update({
      where: { id },
      data: {
        ...updateArtistDto,
      },
    });
    return updatedArtist;
  }

  async remove(id: string) {
    const toBeRemoved = await this.db.artist.findUnique({ where: { id } });

    if (!toBeRemoved) {
      throw new NotFoundException('The artist is not found');
    }

    await this.db.artist.delete({ where: { id } });

    return toBeRemoved;
  }
}
