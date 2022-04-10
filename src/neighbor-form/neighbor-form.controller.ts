import { Body, Controller, Delete, Get, Param, Post, Render } from "@nestjs/common";
import { NeighborFormService } from "./neighbor-form.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { SaveNeighborFormDto } from "./dto/save-neighbor-form.dto";

// В 6 лабе userId будет получаться не прямой передачей в методе
@ApiTags("neighbor-form")
@Controller()
export class NeighborFormController {
  constructor(private readonly neighborFormService: NeighborFormService) {
  }

  @ApiOperation({ summary: "Show all neighbor forms" })
  @Get("/neighbors")
  @Render("neighbors")
  neighbors() {
    return this.neighborFormService.getAllNeighborForms();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show blank neighbor form" })
  @Get("/neighbor_form")
  @Render("neighbor_form")
  blankNeighborForm() {
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show own user's neighbor form" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Get(":userId/neighbor_form")
  @Render("neighbor_form")
  neighborForm(@Param("userId") userId: number) {
    return this.neighborFormService.getNeighborFormByUserId(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Save(Create or change) own user's neighbor form" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Post("/:userId/neighbor_form")
  saveNeighborForm(@Param("userId") userId: number, @Body() saveNeighborFormDto: SaveNeighborFormDto) {
    return this.neighborFormService.saveNeighborForm(saveNeighborFormDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete own user's neighbor form" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Delete("/:userId/neighbor_form")
  deleteNeighborForm(@Param("userId") userId: number) {
    return this.neighborFormService.deleteNeighborForm(userId);
  }
}
