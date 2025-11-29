import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();
    const album = {
      id,
      artistId: null,
      ...createAlbumDto,
    };

    this.db.albums.push(album);

    return album;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('The album is not found');
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);

    Object.assign(album, updateAlbumDto);

    return album;
  }

  remove(id: string) {
    const toBeRemoved = this.findOne(id);

    this.db.albums = this.db.albums.filter((album) => album.id !== id);

    this.db.cleanUpAlbumReferences(id);

    return toBeRemoved;
  }
}
