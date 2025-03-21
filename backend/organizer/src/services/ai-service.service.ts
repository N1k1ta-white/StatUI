import { Body, Get, Injectable } from '@nestjs/common';
import { parse } from 'path';
import { chatWithLLM } from 'src/util/chatWithLLM';
import { createPrompt } from 'src/util/createPrompt';
import { FileService } from './file.service';
import { AnalysisMethod } from 'src/interfaces/analysis-method.interface';
import { z } from 'zod';
import { StatisticService } from './statistic.service';

@Injectable()
export class AiSuggestionService {

    constructor(
        private readonly fileService: FileService,
        private readonly statisticService: StatisticService,
    ) {}

    private readonly analysis = z.array(z.object({
        method: z.string(),
        attributes_analysis: z.array(z.string()),
        expected_results: z.string(), 
      }));
    
    async suggestAnalysisMethods(@Body() fileId: string ) {
        const extractedTypes = await this.fileService.extractTypes(fileId);
        const notes = await this.fileService.getNotes(fileId);
        const prompt = createPrompt(notes, extractedTypes);

        let methods: AnalysisMethod[] = [];
        const maxAttempts = 3;
        let attempt = 0;
        
        while (attempt < maxAttempts) {
            try {
                const response = await chatWithLLM(prompt, this.analysis);
                if (!response) break;
                    methods = JSON.parse(response);
                break;
            } catch (error) {
                console.log(`Attempt ${attempt + 1} failed:`, error);
                attempt++;
                if (attempt === maxAttempts) {
                    console.error('Failed to parse AI response after max attempts');
                }
            }
        }

        await this.statisticService.submitFileToStatistics(fileId);
        console.log('Methods:', methods);

        return await this.statisticService.sendAnalysisRequest(fileId, methods);
    }
}
