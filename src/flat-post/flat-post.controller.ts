import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  Res,
  UseGuards
} from "@nestjs/common";
import { FlatPostService } from "./flat-post.service";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { FlatPostDto } from "./dto/flat-post.dto";
import { Response } from "express";
import { Session } from "../auth/session.decorator";
import { SessionContainer } from "supertokens-node/lib/build/recipe/session/faunadb";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags("flat-post")
@Controller("/flats")
export class FlatPostController {
  constructor(private readonly flatPostService: FlatPostService) {
  }

  @ApiOperation({ summary: "Show all flat's posts" })
  @ApiOkResponse({ description: "Everything is OK" })
  @Get()
  async flats(@Res() res: Response) {
    const flats = await this.flatPostService.getAllFlatPostsWithAccountInfo();
    res.render("flats", {
      flats: flats
    });
    // res.status(HttpStatus.OK).json({
    //   flats: flats
    // })
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Get("/new-flat")
  @Render("rent_flat")
  showBlankFlatPost() {
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Create new flat post" })
  @ApiCreatedResponse({ description: "FlatPost was created" })
  @ApiBadRequestResponse({ description: "Invalid flatPost data" })
  @UseGuards(AuthGuard)
  @Post()
  async createNewFlatPost(@Session() session: SessionContainer, @Body() flatPostDto: FlatPostDto) {
    return await this.flatPostService.createNewFlatPost(flatPostDto, session.getUserId());
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show flat's post with data to change it" })
  @ApiParam({ name: "flatId", type: "number" })
  @ApiOkResponse({ description: "Everything is OK" })
  @ApiForbiddenResponse({ description: "Current user is not an flatPost's author" })
  @ApiNotFoundResponse({description: "FlatPost with this id does not exist"})
  @UseGuards(AuthGuard)
  @Get("/:flatId")
  async showFlatPost(@Session() session: SessionContainer,
                     @Param("flatId", new ParseIntPipe()) flatId: number,
                     @Res() res: Response) {
    const flat = await this.flatPostService.findFlatPostById(flatId, session.getUserId());
    res.render("rent_flat", {
      flat: flat
    });
    // res.status(HttpStatus.OK).json({
    //   flat: flat
    // })
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change flat's post" })
  @ApiParam({ name: "flatId", type: "number" })
  @ApiCreatedResponse({ description: "FlatPost was changed"})
  @ApiForbiddenResponse({ description: "Current user is not an flatPost's author"})
  @ApiNotFoundResponse({description: "FlatPost with this id does not exist"})
  @ApiBadRequestResponse({ description: "Invalid flatPost data" })
  @UseGuards(AuthGuard)
  @Put("/:flatId")
  async changeFlatPost(@Session() session: SessionContainer,
                       @Param("flatId", new ParseIntPipe()) flatId: number,
                       @Body() flatPostDto: FlatPostDto) {
    return await this.flatPostService.changeFlatPost(flatPostDto, flatId, session.getUserId());
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete flat's post" })
  @ApiParam({ name: "flatId", type: "number" })
  @ApiOkResponse({ description: "Everything is OK" })
  @ApiForbiddenResponse({ description: "Current user is not an flatPost's author"})
  @ApiNotFoundResponse({description: "FlatPost with this id does not exist"})
  @UseGuards(AuthGuard)
  @Delete("/:flatId")
  async deleteFlatPost(@Session() session: SessionContainer,
                       @Param("flatId", new ParseIntPipe()) flatId: number) {
    return await this.flatPostService.deleteFlatPost(flatId, session.getUserId());
  }
}
