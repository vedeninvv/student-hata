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
import { CreateUserDto } from "./dto/create-user.dto";
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

  @ApiOperation({ summary: "Create new user and blank account, which connected with user by one-to-one" })
  @ApiCreatedResponse({ description: "User was created" })
  @ApiBadRequestResponse({ description: "Invalid user data" })
  @UseGuards(AuthGuard)
  @Post("/user")
  async createUser(@Body() createUserDto: CreateUserDto, @Session() session: SessionContainer) {
    await this.userService.createUser(createUserDto, session.getUserId());
  }

  // @ApiBearerAuth()
  // @ApiOperation({ summary: "Change password" })
  // @ApiQuery({ name: "userId", type: "number" })
  // @ApiCreatedResponse( { description: "Password was changed" })
  // @ApiBadRequestResponse({ description: "Invalid password data" })
  // @Put("/user/password")
  // async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Query("userId") userId: string) {
  //   return await this.userService.changePassword(changePasswordDto, userId);
  // }
  //
  // @ApiBearerAuth()
  // @ApiOperation({ summary: "Change email" })
  // @ApiQuery({ name: "userId", type: "number" })
  // @ApiCreatedResponse( { description: "Email was changed" })
  // @ApiBadRequestResponse({ description: "Invalid email data" })
  // @Put("/user/email")
  // async changeEmail(@Body() changeEmailDto: ChangeEmailDto, @Query("userId") userId: string) {
  //   return await this.userService.changeEmail(changeEmailDto, userId);
  // }

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
    // res.render("account",
    //   { account: account }
    // );
    res.status(HttpStatus.OK).json({
      account: account
    });
  }
}
