import { Test, TestingModule } from "@nestjs/testing";
import { NeighborFormService } from "./neighbor-form.service";

describe("NeighborFormService", () => {
  let service: NeighborFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeighborFormService]
    }).compile();

    service = module.get<NeighborFormService>(NeighborFormService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
