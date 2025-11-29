import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artist/entities/artist.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DbService {
  public users: User[] = [
    {
      id: 'def92471-4567-4efa-a282-3d8e570d8268',
      login: 'neko',
      password: '123456',
      version: 1,
      createdAt: 1764401916473,
      updatedAt: 0,
    },
    {
      id: '774147e1-e07c-4b1a-a9ca-c8ca598d8b99',
      login: 'qwerty',
      password: 'qwerty123',
      version: 1,
      createdAt: 1764402044672,
      updatedAt: 0,
    },
  ];

  public artists: Artist[] = [
    {
      id: '784147e2-e03c-4b1a-a9ca-c8ca598d8b99',
      name: 'Beyoncé',
      grammy: true,
    },
    {
      id: 'def92473-4967-5efa-a882-1d8e570d9262',
      name: 'Jay-Z',
      grammy: true,
    },
  ];
}
