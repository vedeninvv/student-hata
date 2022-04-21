import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Res } from "@nestjs/common";
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
  ApiParam,
  ApiTags
} from "@nestjs/swagger";
import { SaveNeighborFormDto } from "./dto/save-neighbor-form.dto";
import { UniversityService } from "../university/university.service";
import { GenderService } from "../gender/gender.service";

// В 6 лабе userId будет получаться не прямой передачей в методе
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
    return this.neighbourFormService.getAllNeighbourForms();
  }

  @ApiExcludeEndpoint()
  @Get("/neighbor_form/new")
  async blankNeighbourForm(@Res() res: Response) {
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show own user's neighbor form" })
  @ApiParam({ name: "id", type: "number", description: "User's id" })
  @ApiOkResponse({ description: "Everything is OK" })
  @ApiForbiddenResponse({ description: "NeighbourForm does not belong to this user" })
  @ApiNotFoundResponse({ description: "NeighbourForm for this user does not exist" })
  @Get("/user/:id/neighbor-form")
  async neighbourForm(@Param("id", new ParseIntPipe()) userId: number, @Res() res: Response) {
    return this.neighbourFormService.getNeighbourFormByUserId(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Save(Create or change) own user's neighbor form" })
  @ApiParam({ name: "id", type: "number", description: "User's id" })
  @ApiCreatedResponse({ description: "NeighbourForm was created"})
  @ApiBadRequestResponse( {description: "NeighbourForm invalid data"})
  @Post("/user/:id/neighbor-form")
  async saveNeighbourForm(@Param("id", new ParseIntPipe) userId: number,
                          @Body() saveNeighborFormDto: SaveNeighborFormDto) {
    return this.neighbourFormService.saveNeighbourForm(saveNeighborFormDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete own user's neighbor form" })
  @ApiParam({ name: "id", type: "number", description: "User's id" })
  @ApiOkResponse({ description: "Everything is OK" })
  @ApiNotFoundResponse({ description: "NeighbourForm for this user does not exist" })
  @Delete("/user/:id/neighbor-form")
  async deleteNeighbourForm(@Param("userId", new ParseIntPipe()) userId: number) {
    return this.neighbourFormService.deleteNeighbourForm(userId);
  }
}
