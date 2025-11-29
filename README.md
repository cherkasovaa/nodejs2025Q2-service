# Home Library Service

Rest API for a Home Library Service. The service allows you to manage users, artists, albums, tracks, and add them to favorites.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **ID Generation:** uuid
- **Database:** In-memory storage

## API Resources

The API exposes the following RESTful endpoints:

| Resource  | Route              | Methods                | Description                       |
| :-------- | :----------------- | :--------------------- | :-------------------------------- |
| Users     | `/user`            | `GET`, `POST`          | Manage users                      |
|           | `/user/:id`        | `GET`, `PUT`, `DELETE` | Get, update password, delete user |
| Artists   | `/artist`          | `GET`, `POST`          | Manage artists                    |
|           | `/artist/:id`      | `GET`, `PUT`, `DELETE` | CRUD operations for artist        |
| Albums    | `/album`           | `GET`, `POST`          | Manage albums                     |
|           | `/album/:id`       | `GET`, `PUT`, `DELETE` | CRUD operations for album         |
| Tracks    | `/track`           | `GET`, `POST`          | Manage tracks                     |
|           | `/track/:id`       | `GET`, `PUT`, `DELETE` | CRUD operations for track         |
| Favorites | `/favs`            | `GET`                  | Get all favorites                 |
|           | `/favs/track/:id`  | `POST`, `DELETE`       | Add/Remove track from favorites   |
|           | `/favs/album/:id`  | `POST`, `DELETE`       | Add/Remove album from favorites   |
|           | `/favs/artist/:id` | `POST`, `DELETE`       | Add/Remove artist from favorites  |

## Downloading

```
git clone https://github.com/cherkasovaa/nodejs2025Q2-service.git
cd nodejs2025Q2-service
```

## Installing NPM modules

```
npm install
```

## Create .env file
Сopy from `.env.example`: 
```
cp .env.example .env
```
**Default port**: 4000

## Running application

```
# development
npm run start
```

```
# watch mode
npm run start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
