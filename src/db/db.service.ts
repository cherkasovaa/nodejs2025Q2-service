import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favs } from 'src/favs/entities/favs.entities';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DbService {
  public users: User[] = [
    {
      id: uuidv4(),
      login: 'neko',
      password: '123456',
      version: 1,
      createdAt: 1764401916473,
      updatedAt: 0,
    },
    {
      id: uuidv4(),
      login: 'qwerty',
      password: 'qwerty123',
      version: 1,
      createdAt: 1764402044672,
      updatedAt: 0,
    },
  ];

  public artists: Artist[] = [
    {
      id: 'c8261bc5-9e5a-47a0-88a6-5cba3433373e',
      name: 'Beyoncé',
      grammy: true,
    },
    {
      id: '84efcb36-bfad-486d-9f63-8c144299db8b',
      name: 'Jay-Z',
      grammy: true,
    },
  ];
  public albums: Album[] = [
    {
      id: '39fcdc2f-c117-4321-9b77-7a4ffaec98b6',
      name: 'Perfect Duet',
      year: 2017,
      artistId: null,
    },
    {
      id: '4527519d-8feb-4d35-b9d1-4e03c254d863',
      name: 'RENAISSANCE',
      year: 2022,
      artistId: null,
    },
  ];
  public tracks: Track[] = [
    {
      id: 'a3488afc-164b-464a-8cbf-ed348f057db3',
      name: "Virgo's Groove",
      artistId: null,
      albumId: null,
      duration: 368,
    },
    {
      id: 'ffe85afe-af9f-49f3-adeb-e9f2a6e302a1',
      name: 'Perfect Duet',
      artistId: null,
      albumId: null,
      duration: 260,
    },
  ];

  public favs: Favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  cleanUpAlbumReferences(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });

    this.favs.albums = this.favs.albums.filter((id) => id !== albumId);
  }

  cleanUpArtistReferences(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });

    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });

    this.favs.artists = this.favs.artists.filter((id) => id !== artistId);
  }
}
