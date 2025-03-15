import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';

interface ExtractedType {
  type: string;
  factors?: string[];
}

@Injectable()
export class TypeExtractorService {
    async extractCsvTypes(filePath: string, sampleSize = 2000): Promise<Record<string, ExtractedType>> {
        return new Promise((resolve, reject) => {
          const results: any[] = [];
          const columnValues: Record<string, Set<string>> = {};
          
          console.log(filePath);
          
          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
              if (results.length < sampleSize) {
                results.push(row);
                
                for (const [key, value] of Object.entries(row)) {
                  if (!columnValues[key]) {
                    columnValues[key] = new Set();
                  }
                  columnValues[key].add(String(value));
                }
              }
            })
            .on('end', () => {
              const inferredTypes: Record<string, ExtractedType> = {};
    
              for (const [key, values] of Object.entries(columnValues)) {
                const uniqueValues = Array.from(values);
                const detectedType = this.detectType(uniqueValues);
    
                inferredTypes[key] = { type: detectedType };

                // If it's a categorical variable (factor), add factor values
                if (detectedType === 'factor') {
                  inferredTypes[key].factors = uniqueValues;
                }
              }
    
              resolve(inferredTypes);
            })
            .on('error', (err) => reject(err));
        });
      }
    
      private detectType(values: string[]): string {
        const types = new Set(values.map((value) => this.getPrimitiveType(value)));
    
        if (types.has('string') && values.length < 25) return 'factor'; // Treat as categorical if few unique values
        if (types.has('string')) return 'string';
        if (types.has('date')) return 'date';
        if (types.has('number')) return 'number';
        if (types.has('boolean')) return 'boolean';
        return 'unknown';
      }
    
      private getPrimitiveType(value: string): string {
        if (value.trim() === '') return 'null';
        if (!isNaN(Number(value))) return 'number';
        if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') return 'boolean';
        if (!isNaN(Date.parse(value))) return 'date';
        return 'string';
      }
    
}
