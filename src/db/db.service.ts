import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
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
      id: uuidv4(),
      name: 'Beyoncé',
      grammy: true,
    },
    {
      id: uuidv4(),
      name: 'Jay-Z',
      grammy: true,
    },
  ];
  public albums: Album[] = [
    {
      id: uuidv4(),
      name: 'Perfect Duet',
      year: 2017,
      artistId: null,
    },
    {
      id: uuidv4(),
      name: 'RENAISSANCE',
      year: 2022,
      artistId: null,
    },
  ];
  public tracks: Track[] = [
    {
      id: uuidv4(),
      name: "Virgo's Groove",
      artistId: null,
      albumId: null,
      duration: 368,
    },
    {
      id: uuidv4(),
      name: 'Perfect Duet',
      artistId: null,
      albumId: null,
      duration: 260,
    },
  ];
}
