# Home Library Service

Rest API for a Home Library Service. The service allows you to manage users, artists, albums, tracks, and add them to favorites.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop - [Download & Install Docker](https://www.docker.com/)

## Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Containerization:** Docker

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

```
# Copy from example
cp .env.example .env
```
**Default port**: 4000

## Running application

### Using Docker

1. Build and start containers:
```
docker-compose up -d --build
```

The API will be available at `http://localhost:4000`.
OpenAPI documentation: `http://localhost:4000/doc`

2. To stop containers:
```
docker-compose down
```

3. Check the status of the containers
   ```
   docker ps
   ```
Expected `library_postgres` has the status `healthy` and `library_app` has the status `Up`.

4. Stop and delete the DB 
```
docker-compose down -v
```

### Local Development

1. Start a PostgreSQL instance locally (or use Docker just for DB)

```
docker-compose up -d postgres
```

2. Apply database migrations:
```
npx prisma migrate dev
```
3. Start the application:
  ```
  # development mode
  npm run start:dev
  ```

  ```
  # watch mode
  npm run start:dev
  ```

  ```
  # production mode
  npm run start:prod
  ```

```
# development
npm run start
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

## Commands Cheat Sheet

| Command                                   | Description                                                          |
| ----------------------------------------- | -------------------------------------------------------------------- |
| **NPM & Development**                     |
| `npm install`                             | Install project dependencies                                         |
| `npm run start:dev`                       | Start NestJS in watch (development) mode (local run)                 |
| `npm run build`                           | Build the project into the `dist` folder                             |
| `npm run start:prod`                      | Start the app from the built `dist` (production mode)                |
| `npm run test`                            | Run all tests                                                        |
| `npm run test -- <path-to-spec>`          | Run a specific test file (e.g. `test/users.e2e.spec.ts`)             |
| `npm run lint`                            | Run ESLint (auto-fix where possible)                                 |
| `npm run format`                          | Format code with Prettier                                            |
| `npm run scan:vuln`                       | Scan dependencies for security vulnerabilities                       |
| **Docker**                                |
| `docker-compose up -d --build`            | Build images and start all services (app + PostgreSQL) in background |
| `docker-compose up -d`                    | Start containers without rebuilding                                  |
| `docker-compose up -d postgres`           | Start only PostgreSQL service in Docker                              |
| `docker-compose down`                     | Stop and remove containers (keep volumes/data)                       |
| `docker-compose down -v`                  | Stop containers and remove volumes (reset database)                  |
| `docker ps`                               | Show running containers                                              |
| `docker logs -f library_app`              | View application logs in real-time                                   |
| `docker logs library_app --tail 100`      | Show last 100 log lines from the app container                       |
| `docker logs library_postgres --tail 100` | Show last 100 log lines from the PostgreSQL container                |
| **Prisma (Database)**                     |
| `npx prisma migrate dev`                  | Create and apply database migrations (local dev)                     |
| `npx prisma studio`                       | Open Prisma Studio (GUI to view database data)                       |
| `npx prisma generate`                     | Generate Prisma Client assets                                        |
