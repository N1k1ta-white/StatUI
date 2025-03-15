import { Test, TestingModule } from '@nestjs/testing';
import { TypeExtractorService } from './type-extractor.service';

describe('TypeExtractorService', () => {
  let service: TypeExtractorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeExtractorService],
    }).compile();

    service = module.get<TypeExtractorService>(TypeExtractorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
