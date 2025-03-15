import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from 'src/entity/file.entity';
import { TypeExtractorService } from 'src/type-extractor/type-extractor.service';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private fileRepository: Repository<FileEntity>,
        private typeExtractorService: TypeExtractorService
    ) {}

    private getPath(fileName: string) {
        return process.env.FILE_STORAGE_PATH + '/' + fileName;
    }

    async saveFile(fileData: Express.Multer.File): Promise<{ file: FileEntity, originalName: string }> {
        const uniqueName = fileData.filename;
        console.log('File saved:', uniqueName);
        const file = new FileEntity();
        file.fileName = uniqueName;
        file.originalName = fileData.originalname;
        file.mimeType = fileData.mimetype;
        file.size = fileData.size;

        this.typeExtractorService.extractCsvTypes(this.getPath(file.fileName));   

        const savedFile = await this.fileRepository.save(file);
        return { file: savedFile, originalName: fileData.originalname };
    }

    async extractTypes(fileId: string): Promise<Record<string, any>> {
        const file = await this.fileRepository.findOne({ where: { id: fileId } });
        if (!file) {
            throw new BadRequestException('File not found');
        }  
        return this.typeExtractorService.extractCsvTypes(this.getPath(file.fileName));
    }
}