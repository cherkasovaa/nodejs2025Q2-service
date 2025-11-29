import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      artistId: null,
      albumId: null,
      ...createTrackDto,
    };

    this.db.tracks.push(track);
    return track;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException('The track not found');
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);

    Object.assign(track, updateTrackDto);

    return track;
  }

  remove(id: string) {
    const toBeRemove = this.findOne(id);

    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);

    return toBeRemove;
  }
}
