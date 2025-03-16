import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Express } from 'express';
import { FileUploadInterceptor } from './interceptors/file.interceptor';
import { FileService } from './services/file.service';
import { AiSuggestionService } from './services/ai-service.service';
import { AnalysisMethod } from './interfaces/analysis-method.interface';
@Controller()
export class AppController {
  constructor(
    private readonly fileService: FileService,
    private readonly aiService: AiSuggestionService
  ) {}

  @Post('upload')
  @UseInterceptors(FileUploadInterceptor.getInterceptor())
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.fileService.saveFile(file);
    return {
      ...result.file,
      originalName: result.originalName
    };
  }

  @Get('statistic')
  async getStatistic(@Body() data: { fileId: string, methods: AnalysisMethod[] }) {

  }

  @Get('types')
  async extractTypes(@Body() data: { fileId: string }) {
    return this.fileService.extractTypes(data.fileId);
  }

  @Get('suggest')
  async suggestAnalysisMethods(@Body() data : { fileId: string, notes: string } ): Promise<AnalysisMethod[]> {
    return this.aiService.suggestAnalysisMethods(data.fileId, data.notes);
  }
}

