import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Render, Res } from "@nestjs/common";
import { FlatPostService } from "./flat-post.service";
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
  ApiQuery,
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
  @ApiOkResponse({ description: "Everything is OK" })
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
  @ApiQuery({ name: "userId", type: "number" })
  @ApiCreatedResponse({ description: "FlatPost was created" })
  @ApiBadRequestResponse({ description: "Invalid flatPost data" })
  @Post("/flats")
  async createNewFlatPost(@Query("userId", new ParseIntPipe()) userId: number, @Body() flatPostDto: FlatPostDto) {
    this.flatPostService.createNewFlatPost(flatPostDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show flat's post with data to change it" })
  @ApiQuery({ name: "userId", type: "number" })
  @ApiParam({ name: "flatId", type: "number" })
  @ApiOkResponse({ description: "Everything is OK" })
  @ApiForbiddenResponse({ description: "Current user is not an flatPost's author" })
  @ApiNotFoundResponse({description: "FlatPost with this id does not exist"})
  @Get("/:flatId")
  async showFlatPost(@Query("userId", new ParseIntPipe()) userId: number,
                     @Param("flatId", new ParseIntPipe()) flatId: number,
                     @Res() res: Response) {
    return this.flatPostService.findFlatPostById(flatId, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change flat's post" })
  @ApiQuery({ name: "userId", type: "number" })
  @ApiParam({ name: "flatId", type: "number" })
  @ApiCreatedResponse({ description: "FlatPost was changed"})
  @ApiForbiddenResponse({ description: "Current user is not an flatPost's author"})
  @ApiNotFoundResponse({description: "FlatPost with this id does not exist"})
  @ApiBadRequestResponse({ description: "Invalid flatPost data" })
  @Put("/:flatId")
  async changeFlatPost(@Query("userId", new ParseIntPipe()) userId: number,
                       @Param("flatId", new ParseIntPipe()) flatId: number,
                       @Body() flatPostDto: FlatPostDto) {
    return this.flatPostService.changeFlatPost(flatPostDto, flatId, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete flat's post" })
  @ApiQuery({ name: "userId", type: "number" })
  @ApiParam({ name: "flatId", type: "number" })
  @ApiOkResponse({ description: "Everything is OK" })
  @ApiForbiddenResponse({ description: "Current user is not an flatPost's author"})
  @ApiNotFoundResponse({description: "FlatPost with this id does not exist"})
  @Delete("/:flatId")
  async deleteFlatPost(@Query("userId", new ParseIntPipe()) userId: number,
                       @Param("flatId", new ParseIntPipe()) flatId: number) {
    return this.flatPostService.deleteFlatPost(flatId, userId);
  }
}
