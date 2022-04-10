import { Body, Controller, Delete, Get, Param, Post, Put, Render } from "@nestjs/common";
import { FlatPostService } from "./flat-post.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { FlatPostDto } from "./dto/flat-post.dto";

// В 6 лабе userId будет получаться не прямой передачей в методе
@ApiTags("flat-post")
@Controller("/flats")
export class FlatPostController {
  constructor(private readonly flatPostService: FlatPostService) {
  }

  @ApiOperation({ summary: "Show all flat's posts" })
  @Get()
  @Render("flats")
  flats() {
    return this.flatPostService.getAllFlatPosts();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show blank flat post to input data about flat" })
  @Get("/new-flat")
  @Render("rent_flat")
  showBlankFlatPost() {
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Create new flat post" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Post("/new-flat/:userId")
  createNewFlatPost(@Param("userId") userId: number, @Body() flatPostDto: FlatPostDto) {
    this.flatPostService.createNewFlatPost(flatPostDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show flat's post with data to change it" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiParam({ name: "flatId", type: "number" })
  @Get("/flats/:flatId/:userId")
  @Render("rent_flat")
  showFlatPost(@Param("userId") userId: number, @Param("flatId") flatId: number) {
    return this.flatPostService.findFlatPostById(flatId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change flat's post" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiParam({ name: "flatId", type: "number" })
  @Put("/flats/:flatId/:userId")
  changeFlatPost(@Param("userId") userId: number,
                 @Param("flatId") flatId: number,
                 @Body() flatPostDto: FlatPostDto) {
    return this.flatPostService.changeFlatPost(flatPostDto, flatId, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete flat's post" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiParam({ name: "flatId", type: "number" })
  @Delete("/flats/:flatId/:userId")
  deleteFlatPost(@Param("userId") userId: number, @Param("flatId") flatId: number) {
    return this.flatPostService.deleteFlatPost(flatId, userId);
  }
}
