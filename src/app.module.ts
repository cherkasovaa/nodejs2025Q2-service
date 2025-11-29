import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, DbModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
