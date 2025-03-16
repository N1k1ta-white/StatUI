import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Express } from 'express';
import { FileUploadInterceptor } from './interceptors/file.interceptor';
import { FileService } from './services/file.service';
import { AiSuggestionService } from './services/ai-service.service';
import { AnalysisMethod } from './interfaces/analysis-method.interface';
import { StatisticService } from './services/statistic.service';

@Controller()
export class AppController {
  constructor(
    private readonly fileService: FileService,
    private readonly aiService: AiSuggestionService,
    private readonly statisticsService: StatisticService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileUploadInterceptor.getInterceptor())
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() data: { notes: string }) {
    const result = await this.fileService.saveFile(file, data.notes);
    return {
      ...result.file,
      originalName: result.originalName
    };
  }

  @Get('statistic')
  async getStatistic(@Body() data: { fileId: string, methods: AnalysisMethod[] }) {
    if (!await this.statisticsService.checkFile(data.fileId)) {
      await this.statisticsService.loadFile(data.fileId);
    }
    return this.statisticsService.sendAnalysisRequest(data.fileId, data.methods);
  }

  @Get('types')
  async extractTypes(@Body() data: { fileId: string }) {
    return this.fileService.extractTypes(data.fileId);
  }

  @Get('descriptive/:fileId')
  async getDescriptiveStatistics(@Param('fileId') fileId: string) {
    return this.statisticsService.getDescriptiveStatistics(fileId);
  }

  @Get('suggest')
  async suggestAnalysisMethods(@Body() data : { fileId: string, notes: string } ) {
    return await this.aiService.suggestAnalysisMethods(data.fileId, data.notes);
  }
}

