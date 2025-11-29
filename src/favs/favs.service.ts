import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsService {
  constructor(private db: DbService) {}

  findAll() {
    return {
      tracks: this.toResponse('tracks'),
      albums: this.toResponse('albums'),
      artists: this.toResponse('artists'),
    };
  }

  addTrack(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    this.db.favs.tracks.push(id);

    return track;
  }

  addAlbum(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) {
      throw new UnprocessableEntityException('The album not found');
    }

    this.db.favs.albums.push(id);

    return album;
  }

  addArtist(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new UnprocessableEntityException('The artist not found');
    }

    this.db.favs.artists.push(id);

    return artist;
  }

  deleteTrack(id: string) {
    const toBeRemoved = this.findOne(id, 'tracks');

    this.db.favs.tracks = this.db.favs.tracks.filter(
      (trackId) => trackId !== id,
    );

    return toBeRemoved;
  }

  deleteAlbum(id: string) {
    const toBeRemoved = this.findOne(id, 'albums');

    this.db.favs.albums = this.db.favs.albums.filter(
      (albumId) => albumId !== id,
    );

    return toBeRemoved;
  }

  deleteArtist(id: string) {
    const toBeRemoved = this.findOne(id, 'artists');

    this.db.favs.artists = this.db.favs.artists.filter(
      (artistId) => artistId !== id,
    );

    return toBeRemoved;
  }

  private findOne(id: string, type: 'artists' | 'albums' | 'tracks') {
    const arr = this.db.favs[type];
    const item = arr.find((itemId) => itemId === id);

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  private toResponse(type: 'artists' | 'albums' | 'tracks') {
    const dbFavs = this.db.favs[type];
    const arr = this.db[type];

    return dbFavs
      .map((id: string) => arr.find((item) => item.id === id))
      .filter(Boolean);
  }
}
