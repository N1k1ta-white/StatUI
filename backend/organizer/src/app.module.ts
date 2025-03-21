import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { FileService } from './services/file.service';
import { DatabaseModule } from './util/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeExtractorService } from './type-extractor/type-extractor.service';
import { AiSuggestionService } from './services/ai-service.service';
import { StatisticService } from './services/statistic.service';

@Module({
  imports: [HttpModule, DatabaseModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [FileService, TypeExtractorService, AiSuggestionService, StatisticService],
})
export class AppModule {}
