import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  public users = [
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
}
