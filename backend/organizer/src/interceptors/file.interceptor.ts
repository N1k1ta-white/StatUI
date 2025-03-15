import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class FileUploadInterceptor {
  static getInterceptor() {
    return FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          callback(null, uniqueName);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'text/csv' && !file.originalname.toLowerCase().endsWith('.csv')) {
          return callback(new UnsupportedMediaTypeException('Only CSV files are allowed!'), false);
        }
        callback(null, true);
      },
    });
  }
}
