import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Render, Res } from "@nestjs/common";
import { NeighbourFormService } from "./neighbour-form.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { SaveNeighborFormDto } from "./dto/save-neighbor-form.dto";
import { Response } from "express";

// В 6 лабе userId будет получаться не прямой передачей в методе
@ApiTags("neighbor-form")
@Controller()
export class NeighbourFormController {
  constructor(private readonly neighbourFormService: NeighbourFormService) {
  }

  @ApiOperation({ summary: "Show all neighbor forms" })
  @Get("/neighbors")
  async neighbours(@Res() res: Response) {
    const neighbours = await this.neighbourFormService.getAllNeighbourForms();
    // res.render("neighbors",
    //   { neighbours: neighbours });
    res.status(HttpStatus.OK).json({
      neighbours: neighbours
    })
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show blank neighbor form" })
  @Get("/neighbor_form/new")
  @Render("neighbor_form")
  blankNeighbourForm() {
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show own user's neighbor form" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Get(":userId/neighbor_form")
  async neighbourForm(@Param("userId", new ParseIntPipe()) userId: number, @Res() res: Response) {
    const neighbourForm = await this.neighbourFormService.getNeighbourFormByUserId(userId);
    // res.render("neighbor_form",
    //   { form: neighbourForm }
    // );
    res.status(HttpStatus.OK).json({
      form: neighbourForm
    })
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Save(Create or change) own user's neighbor form" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Post("/:userId/neighbor_form")
  async saveNeighbourForm(@Param("userId", new ParseIntPipe) userId: number,
                          @Body() saveNeighborFormDto: SaveNeighborFormDto) {
    return await this.neighbourFormService.saveNeighbourForm(saveNeighborFormDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete own user's neighbor form" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Delete("/:userId/neighbor_form")
  async deleteNeighbourForm(@Param("userId", new ParseIntPipe()) userId: number) {
    return await this.neighbourFormService.deleteNeighbourForm(userId);
  }
}
