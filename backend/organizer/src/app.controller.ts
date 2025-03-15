import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Express } from 'express';
import { FileUploadInterceptor } from './interceptors/file.interceptor';
import { FileService } from './services/file.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
    private readonly fileService: FileService
  ) {}

  @Get()
  async getHello() {
    const url = 'http://127.0.0.1:5001'
    const response = await lastValueFrom(this.httpService.get(url));
    console.log(response.data);
  }

  @Post('upload')
  @UseInterceptors(FileUploadInterceptor.getInterceptor())
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.saveFile(file);
  }
}
