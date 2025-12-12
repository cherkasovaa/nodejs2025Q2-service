import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from 'src/logging/logging.middleware';
import { PrismaModule } from 'src/prisma.module';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { FavsModule } from './favs/favs.module';
import { LoggingModule } from './logging/logging.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
