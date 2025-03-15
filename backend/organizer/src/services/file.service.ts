import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from 'src/entity/file.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private fileRepository: Repository<FileEntity>
    ) {}

    async saveFile(fileData: Express.Multer.File): Promise<{ file: FileEntity, originalName: string }> {
        const uniqueName = `${Date.now()}-${uuidv4()}-${fileData.originalname}`;
        const file = new FileEntity();
        file.fileName = uniqueName;
        file.originalName = fileData.originalname;
        file.mimeType = fileData.mimetype;
        file.size = fileData.size;

        const savedFile = await this.fileRepository.save(file);
        return { file: savedFile, originalName: fileData.originalname };
    }
}