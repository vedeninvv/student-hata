import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Render, Res } from "@nestjs/common";
import { FlatPostService } from "./flat-post.service";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse, ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam, ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { FlatPostDto } from "./dto/flat-post.dto";

// В 6 лабе userId будет получаться не прямой передачей в методе
@ApiTags("flat-post")
@Controller("/flats")
export class FlatPostController {
  constructor(private readonly flatPostService: FlatPostService) {
  }

  @ApiOperation({ summary: "Show all flat's posts" })
  @ApiOkResponse()
  @Get()
  async flats(@Res() res: Response) {
    return this.flatPostService.getAllFlatPosts();
  }

  @ApiExcludeEndpoint()
  @Get("/new-flat")
  @Render("rent_flat")
  showBlankFlatPost() {
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Create new flat post" })
  @ApiQuery({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @Post("/new-flat")
  async createNewFlatPost(@Query("userId", new ParseIntPipe()) userId: number, @Body() flatPostDto: FlatPostDto) {
    this.flatPostService.createNewFlatPost(flatPostDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show flat's post with data to change it" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiParam({ name: "flatId", type: "number" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Get("/:flatId/:userId")
  async showFlatPost(@Param("userId", new ParseIntPipe()) userId: number,
                     @Param("flatId", new ParseIntPipe()) flatId: number,
                     @Res() res: Response) {
    return this.flatPostService.findFlatPostById(flatId, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change flat's post" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiParam({ name: "flatId", type: "number" })
  @ApiCreatedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Put("/:flatId/:userId")
  async changeFlatPost(@Param("userId", new ParseIntPipe()) userId: number,
                       @Param("flatId", new ParseIntPipe()) flatId: number,
                       @Body() flatPostDto: FlatPostDto) {
    return this.flatPostService.changeFlatPost(flatPostDto, flatId, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete flat's post" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiParam({ name: "flatId", type: "number" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Delete("/:flatId/:userId")
  async deleteFlatPost(@Param("userId", new ParseIntPipe()) userId: number,
                       @Param("flatId", new ParseIntPipe()) flatId: number) {
    return this.flatPostService.deleteFlatPost(flatId, userId);
  }
}
