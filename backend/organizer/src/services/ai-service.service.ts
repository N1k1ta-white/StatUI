import { Body, Get, Injectable } from '@nestjs/common';
import { parse } from 'path';
import { chatWithLLM } from 'src/util/chatWithLLM';
import { createPrompt } from 'src/util/createPrompt';
import { FileService } from './file.service';
import { AnalysisMethod } from 'src/interfaces/analysis-method.interface';

@Injectable()
export class AiSuggestionService {

    constructor(
        private readonly fileService: FileService
    ) {}

    private readonly suggestionFormat = {
        "type": "json_schema",
        "json_schema": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "method": { 
                        "type": "string", 
                        "description": "Name of the analysis method" 
                    },
                    "attributes_analysis": { 
                        "type": "array",
                        "items": { "type": "string" },
                        "description": "Attributes to be analyzed" 
                    },
                    "expected_results": { 
                        "type": "array",
                        "items": { "type": "string" },
                        "description": "Expected results from the analysis" 
                    }
                },
                "required": ["method", "attributes_analysis", "expected_results"]
            }
        }
    }

    @Get('suggest')
    async suggestAnalysisMethods(@Body() fileId: string, notes: string ): Promise<AnalysisMethod[]> {
        const extractedTypes = await this.fileService.extractTypes(fileId);
        const prompt = createPrompt(notes, extractedTypes);
        console.log('Prompt:', prompt);

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
