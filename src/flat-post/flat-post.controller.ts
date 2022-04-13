import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Render, Res } from "@nestjs/common";
import { FlatPostService } from "./flat-post.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { FlatPostDto } from "./dto/flat-post.dto";
import { Response } from "express";

// В 6 лабе userId будет получаться не прямой передачей в методе
@ApiTags("flat-post")
@Controller("/flats")
export class FlatPostController {
  constructor(private readonly flatPostService: FlatPostService) {
  }

  @ApiOperation({ summary: "Show all flat's posts" })
  @Get()
  async flats(@Res() res: Response) {
    const flats = await this.flatPostService.getAllFlatPosts();
    // res.render("flats", {
    //   flats: flats
    // });
    res.status(HttpStatus.OK).json({
      flats: flats
    })
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
  async createNewFlatPost(@Param("userId", new ParseIntPipe()) userId: number, @Body() flatPostDto: FlatPostDto) {
    return await this.flatPostService.createNewFlatPost(flatPostDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show flat's post with data to change it" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiParam({ name: "flatId", type: "number" })
  @Get("/flats/:flatId/:userId")
  async showFlatPost(@Param("userId", new ParseIntPipe()) userId: number,
                     @Param("flatId", new ParseIntPipe()) flatId: number,
                     @Res() res: Response) {
    const flatPost = await this.flatPostService.findFlatPostById(flatId, userId);
    // res.render("rent_flat", {
    //   flatPost: flatPost
    // });
    res.status(HttpStatus.OK).json({
      flatPost: flatPost
    })
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change flat's post" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiParam({ name: "flatId", type: "number" })
  @Put("/flats/:flatId/:userId")
  async changeFlatPost(@Param("userId", new ParseIntPipe()) userId: number,
                       @Param("flatId", new ParseIntPipe()) flatId: number,
                       @Body() flatPostDto: FlatPostDto) {
    return await this.flatPostService.changeFlatPost(flatPostDto, flatId, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete flat's post" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiParam({ name: "flatId", type: "number" })
  @Delete("/flats/:flatId/:userId")
  async deleteFlatPost(@Param("userId", new ParseIntPipe()) userId: number,
                       @Param("flatId", new ParseIntPipe()) flatId: number) {
    return await this.flatPostService.deleteFlatPost(flatId, userId);
  }
}
