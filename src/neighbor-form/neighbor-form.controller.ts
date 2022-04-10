import { Controller, Get, Render } from "@nestjs/common";
import { NeighborFormService } from "./neighbor-form.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Neighbors')
@Controller()
export class NeighborFormController {
  constructor(private readonly neighborFormService: NeighborFormService) {}

  @Get("/neighbors")
  @Render("neighbors")
  neighbors() {
  }

  @Get("/neighbor_form")
  @Render("neighbor_form")
  neighborForm() {
  }
}
