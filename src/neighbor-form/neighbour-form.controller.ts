import { Body, Controller, Delete, Get, HttpStatus, Post, Render, Res, UseGuards } from "@nestjs/common";
import { NeighbourFormService } from "./neighbour-form.service";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { SaveNeighborFormDto } from "./dto/save-neighbor-form.dto";
import { Response } from "express";
import { UniversityService } from "../university/university.service";
import { GenderService } from "../gender/gender.service";
import { Session } from "../auth/session.decorator";
import { SessionContainer } from "supertokens-node/lib/build/recipe/session/faunadb";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags("neighbor-form")
@Controller()
export class NeighbourFormController {
  constructor(private readonly neighbourFormService: NeighbourFormService,
              private readonly universityService: UniversityService,
              private readonly genderService: GenderService) {
  }

  @ApiOperation({ summary: "Show all neighbor forms" })
  @Get("/neighbors")
  @ApiOkResponse({ description: "Everything is OK" })
  async neighbours(@Res() res: Response) {
    const neighbours = await this.neighbourFormService.getAllNeighbourFormsWithAccountInfo();
    res.render("neighbors",
      { neighbours: neighbours });
    // res.status(HttpStatus.OK).json({
    //   neighbours: neighbours
    // })
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Get("/neighbor_form/new")
  @Render("neighbor_form")
  async blankNeighbourForm(@Res() res: Response) {
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show own user's neighbor form" })
  @ApiOkResponse({ description: "Everything is OK" })
  @ApiForbiddenResponse({ description: "NeighbourForm does not belong to this user" })
  @ApiNotFoundResponse({ description: "NeighbourForm for this user does not exist" })
  @UseGuards(AuthGuard)
  @Get("/user/neighbor-form")
  async neighbourForm(@Session() session: SessionContainer, @Res() res: Response) {
    const neighbourForm = await this.neighbourFormService.getNeighbourFormByUserId(session.getUserId());
    res.status(HttpStatus.OK).json({
      neighbourForm: neighbourForm
    })
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Save(Create or change) own user's neighbor form" })
  @ApiCreatedResponse({ description: "NeighbourForm was created" })
  @ApiBadRequestResponse({ description: "NeighbourForm invalid data" })
  @UseGuards(AuthGuard)
  @Post("/user/neighbor-form")
  async saveNeighbourForm(@Session() session: SessionContainer,
                          @Body() saveNeighborFormDto: SaveNeighborFormDto) {
    return await this.neighbourFormService.saveNeighbourForm(saveNeighborFormDto, session.getUserId());
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete own user's neighbor form" })
  @ApiOkResponse({ description: "Everything is OK" })
  @ApiNotFoundResponse({ description: "NeighbourForm for this user does not exist" })
  @UseGuards(AuthGuard)
  @Delete("/user/neighbor-form")
  async deleteNeighbourForm(@Session() session: SessionContainer) {
    return await this.neighbourFormService.deleteNeighbourForm(session.getUserId());
  }
}
