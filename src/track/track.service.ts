import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private db: PrismaService;
  constructor(private prisma: PrismaService) {
    this.db = this.prisma;
  }

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.db.track.create({
      data: {
        ...createTrackDto,
      },
    });
    return track;
  }

  async findAll() {
    return await this.db.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.db.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('The track not found');
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.db.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('The track is not found');
    }

    const updatedTrack = await this.db.track.update({
      where: { id },
      data: {
        ...updateTrackDto,
      },
    });

    return updatedTrack;
  }

  async remove(id: string) {
    const toBeRemoved = await this.db.track.findUnique({ where: { id } });

    if (!toBeRemoved) {
      throw new NotFoundException('The track is not found');
    }

    await this.db.track.delete({ where: { id } });

    return toBeRemoved;
  }
}
