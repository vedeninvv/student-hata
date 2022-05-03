import { Body, Controller, Get, HttpStatus, Post, Put, Render, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { ChangeAccountDto } from "./dto/change-account.dto";
import { Response } from "express";
import { SessionContainer } from "supertokens-node/lib/build/recipe/session/faunadb";
import { Session } from "../auth/session.decorator";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags("user")
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @ApiExcludeEndpoint()
  @Get("/login")
  @Render("login")
  async login() {
  }

  @ApiExcludeEndpoint()
  @Get("/registration")
  @Render("registration")
  async registration() {
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Get("/user/show-account")
  @Render("account")
  async showAccount() {
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change account info" })
  @ApiCreatedResponse({ description: "Account data was changed" })
  @ApiBadRequestResponse({ description: "Invalid account data" })
  @UseGuards(AuthGuard)
  @Put("/user/account")
  async changeAccountInfo(@Body() changeAccountDto: ChangeAccountDto, @Session() session: SessionContainer) {
    return await this.userService.changeAccountInfo(changeAccountDto, session.getUserId());
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show own user's account info" })
  @ApiOkResponse({ description: "Everything is OK" })
  @UseGuards(AuthGuard)
  @Get("/user/account")
  async accountInfo(@Session() session: SessionContainer, @Res() res: Response) {
    const account = await this.userService.getAccountByUserId(session.getUserId());
    res.status(HttpStatus.OK).json({
      account: account
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Exit from account" })
  @ApiOkResponse({ description: "successful exit" })
  @UseGuards(AuthGuard)
  @Post("/logout")
  async postLogout(@Session() session: SessionContainer): Promise<string> {
    await session.revokeSession();

    return "successful exit";
  }
}
