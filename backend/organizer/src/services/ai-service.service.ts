import { Body, Get, Injectable } from '@nestjs/common';
import { parse } from 'path';
import { chatWithLLM } from 'src/util/chatWithLLM';
import { createPrompt } from 'src/util/createPrompt';
import { ExtractedType } from 'src/util/extract-type';
import { FileService } from './file.service';


export interface AnalysisMethod {
    method: string,
    attributes_analysis: string[],
    expected_results: string[]
}

@Injectable()
export class AiSuggestionService {

    constructor(
        private readonly fileService: FileService
    ) {}

    @Get('suggest')
    async suggestAnalysisMethods(@Body() fileId: string, notes: string ): Promise<AnalysisMethod[]> {
        // TODO: Save extracted types to database 
        const extractedTypes = await this.fileService.extractTypes(fileId);
        console.log('Extracted types:', extractedTypes);

        const prompt = createPrompt(notes, extractedTypes);

        let methods: AnalysisMethod[] = [];
        const maxAttempts = 3;
        let attempt = 0;
        
        while (attempt < maxAttempts) {
            try {
                const response = await chatWithLLM(prompt);
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

        return methods;
    }
}
