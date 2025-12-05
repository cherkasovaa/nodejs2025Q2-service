import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
// import { DbService } from 'src/db/db.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavsService {
  private db: PrismaService;

  constructor(private prisma: PrismaService) {
    this.db = this.prisma;
  }

  async findAll() {
    const favorites = await this.db.favorite.findMany({
      include: {
        album: true,
        artist: true,
        track: true,
      },
    });

    return {
      artists: favorites
        .map((fav) => fav.artist)
        .filter((item) => item !== null),
      albums: favorites.map((fav) => fav.album).filter((item) => item !== null),
      tracks: favorites.map((fav) => fav.track).filter((item) => item !== null),
    };
  }

  async addTrack(id: string) {
    const track = await this.db.track.findUnique({ where: { id } });

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    return await this.db.favorite.create({
      data: {
        trackId: id,
      },
    });
  }

  async addAlbum(id: string) {
    const album = await this.db.album.findUnique({ where: { id } });

    if (!album) {
      throw new UnprocessableEntityException('The album not found');
    }

    return await this.db.favorite.create({
      data: {
        albumId: id,
      },
    });
  }

  async addArtist(id: string) {
    const artist = await this.db.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new UnprocessableEntityException('The artist not found');
    }

    return await this.db.favorite.create({
      data: {
        artistId: id,
      },
    });
  }

  async deleteTrack(id: string) {
    const track = await this.db.favorite.findFirst({ where: { trackId: id } });

    if (!track) {
      throw new NotFoundException('Track is not in favorites');
    }

    return await this.db.favorite.delete({
      where: {
        id: track.id,
      },
    });
  }

  async deleteAlbum(id: string) {
    const album = await this.db.favorite.findFirst({ where: { albumId: id } });

    if (!album) {
      throw new NotFoundException('Album is not in favorites');
    }

    return await this.db.favorite.delete({
      where: {
        id: album.id,
      },
    });
  }

  async deleteArtist(id: string) {
    const artist = await this.db.favorite.findFirst({
      where: { artistId: id },
    });

    if (!artist) {
      throw new NotFoundException('Artist is not in favorites');
    }

    return await this.db.favorite.delete({
      where: {
        id: artist.id,
      },
    });
  }
}
