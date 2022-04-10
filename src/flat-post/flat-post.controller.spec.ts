import { Test, TestingModule } from "@nestjs/testing";
import { FlatPostController } from "./flat-post.controller";

describe("FlatPostController", () => {
  let controller: FlatPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlatPostController]
    }).compile();

    controller = module.get<FlatPostController>(FlatPostController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
