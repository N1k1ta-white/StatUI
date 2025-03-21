import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const destination = './uploads';

@Injectable()
export class FileUploadInterceptor {
  static getInterceptor() {
    return FileInterceptor('file', {
      storage: diskStorage({
        destination,
        filename: (req, file, callback) => {
            const fileExt = file.originalname.split('.').pop();
            const uniqueName = `${Date.now()}-${uuidv4()}.${fileExt}`;
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
