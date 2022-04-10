import { Test, TestingModule } from '@nestjs/testing';
import { FlatPostService } from './flat-post.service';

describe('FlatPostService', () => {
  let service: FlatPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlatPostService],
    }).compile();

    service = module.get<FlatPostService>(FlatPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
