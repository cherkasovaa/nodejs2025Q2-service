import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UserModule, DbModule, ArtistModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
