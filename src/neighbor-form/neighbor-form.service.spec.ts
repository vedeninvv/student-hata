import { Test, TestingModule } from "@nestjs/testing";
import { NeighbourFormService } from "./neighbour-form.service";

describe("NeighborFormService", () => {
  let service: NeighbourFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeighbourFormService]
    }).compile();

    service = module.get<NeighbourFormService>(NeighbourFormService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
