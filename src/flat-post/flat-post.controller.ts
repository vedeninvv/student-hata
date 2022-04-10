import { Controller, Get, Render } from "@nestjs/common";
import { FlatPostService } from "./flat-post.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Posts of flats')
@Controller()
export class FlatPostController {
  constructor(private readonly flatPostService: FlatPostService) {}

  @Get("/flats")
  @Render("flats")
  flats() {
  }

  @Get("/rent_flat")
  @Render("rent_flat")
  rentFlat() {
  }
}
