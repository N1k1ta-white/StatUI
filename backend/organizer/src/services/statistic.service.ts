import { HttpService } from '@nestjs/axios';
import { BadRequestException, Get, HttpCode, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { FileService } from './file.service';

@Injectable()
export class StatisticService {
    private readonly url = process.env.STATISTICS_URL ?? 'http://127.0.0.1:5001';

    constructor(
        private readonly httpService: HttpService,
        private readonly fileService: FileService
    ) {}
    
    async getHello() {
        const response = await lastValueFrom(this.httpService.get(this.url));
        console.log(response.data);
    }

    async checkFile(fileId: string) {
        const name = await this.fileService.getName(fileId);

        const response = await lastValueFrom(this.httpService.get(`${this.url}/check-file/${name}`));
        const result = response.data.exists ?? false;

        return result;
    }

    async loadFile(fileId: string) {
        const fileStream = await this.fileService.getFileStream(fileId);
        const name = await this.fileService.getName(fileId);
        
        // Convert the ReadStream to a Buffer and then create a Blob
        const chunks: Buffer[] = [];
        for await (const chunk of fileStream) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        const blob = new Blob([buffer]);
            
        const formData = new FormData();
        formData.append('file', blob, name);
        formData.append('name', name);
            
        const res = await lastValueFrom(
            this.httpService.post(`${this.url}/upload-file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        );
    }

    async submitFileToStatistics(fileId: string) {
        try {
            if (!await this.checkFile(fileId)) {
            return await this.loadFile(fileId);
            }
        } catch (error) {
            throw new BadRequestException('Failed to upload file to statistics service');
        }
    }
    
}
