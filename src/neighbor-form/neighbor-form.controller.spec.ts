import { Test, TestingModule } from '@nestjs/testing';
import { NeighborFormController } from './neighbor-form.controller';

describe('NeighborFormController', () => {
  let controller: NeighborFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeighborFormController],
    }).compile();

    controller = module.get<NeighborFormController>(NeighborFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
