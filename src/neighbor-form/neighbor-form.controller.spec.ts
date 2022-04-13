import { Test, TestingModule } from "@nestjs/testing";
import { NeighbourFormController } from "./neighbour-form.controller";

describe("NeighborFormController", () => {
  let controller: NeighbourFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeighbourFormController]
    }).compile();

    controller = module.get<NeighbourFormController>(NeighbourFormController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
