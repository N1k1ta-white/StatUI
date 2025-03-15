import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from 'src/entity/file.entity';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private fileRepository: Repository<FileEntity>
    ) {}

    async saveFile(fileData: Express.Multer.File): Promise<FileEntity> {
        const file = new FileEntity();
        file.fileName = fileData.filename;
        file.originalName = fileData.originalname;
        file.mimeType = fileData.mimetype;
        file.size = fileData.size;
        file.content = fileData.buffer;

        return await this.fileRepository.save(file);
    }
}