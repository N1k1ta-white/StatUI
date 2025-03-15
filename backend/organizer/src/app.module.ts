import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { FileService } from './services/file.service';
import { DatabaseModule } from './util/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, DatabaseModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, FileService],
})
export class AppModule {}
