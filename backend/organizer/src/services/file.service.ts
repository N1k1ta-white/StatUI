import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from 'src/entity/file.entity';
import { TypeExtractorService } from 'src/type-extractor/type-extractor.service';
import { createReadStream, existsSync, ReadStream } from 'fs';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private fileRepository: Repository<FileEntity>,
        private typeExtractorService: TypeExtractorService
    ) {}

    getPath(fileName: string) {
        return process.env.FILE_STORAGE_PATH + '/' + fileName;
    }

    async getFileStream(fileId: string): Promise<ReadStream> {
        const file = await this.fileRepository.findOne({ where: { id: fileId } });
        if (!file) {
            throw new BadRequestException('File not found');
        }
        
        const filePath = this.getPath(file.fileName);
        
        try {
            if (!existsSync(filePath)) {
                throw new BadRequestException('File not found on disk');
            }
            
            const stream = createReadStream(filePath);
            return stream;
        } catch (error) {
            throw new BadRequestException(`Failed to read file: ${error.message}`);
        }
    }

    async saveFile(fileData: Express.Multer.File): Promise<{ file: FileEntity, originalName: string }> {
        const uniqueName = fileData.filename;
        const file = new FileEntity();
        file.fileName = uniqueName;
        file.originalName = fileData.originalname;
        file.mimeType = fileData.mimetype;
        file.size = fileData.size;

        try {
            file.typeOfAttributes =
                await this.typeExtractorService.extractCsvTypes(this.getPath(file.fileName));   
            const savedFile = await this.fileRepository.save(file);
            return { file: savedFile, originalName: fileData.originalname };
        } catch (error) {
            throw new BadRequestException('Failed to process file: ' + error.message);
        }
    }

    async extractTypes(fileId: string): Promise<Record<string, any>> {
        const file = await this.fileRepository.findOne({ where: { id: fileId } });
        if (!file) {
            throw new BadRequestException('File not found');
        }  

        return file.typeOfAttributes;
    }

    async getName(fileId: string): Promise<string> {
        const file = await this.fileRepository.findOne({ where: { id: fileId } });
        if (!file) {
            throw new BadRequestException('File not found');
        }

        return file.fileName;
    }
}