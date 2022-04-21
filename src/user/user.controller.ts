import { Body, Controller, Get, ParseIntPipe, Post, Put, Query, Render, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse, ApiExcludeEndpoint, ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangeAccountDto } from "./dto/change-account.dto";

// В 6 лабе userId будет получаться не прямой передачей в методе
@ApiTags("user")
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @ApiExcludeEndpoint()
  @ApiOperation({ summary: "Waiting for lab6..." })
  @Get("/login")
  @Render("login")
  login() {
  }

  @ApiExcludeEndpoint()
  @ApiOperation({ summary: "Waiting for lab6..." })
  @Get("/registration")
  @Render("registration")
  registration() {
  }

  @ApiOperation({ summary: "Create new user and blank account, which connected with user by one-to-one" })
  @ApiCreatedResponse( { description: "User was created" })
  @ApiBadRequestResponse({ description: "Invalid user data" })
  @Post("/user")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change password" })
  @ApiQuery({ name: "userId", type: "number" })
  @ApiCreatedResponse( { description: "Password was changed" })
  @ApiBadRequestResponse({ description: "Invalid password data" })
  @Put("/user/password")
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Query("userId", new ParseIntPipe()) userId: number) {
    return this.userService.changePassword(changePasswordDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change email" })
  @ApiQuery({ name: "userId", type: "number" })
  @ApiCreatedResponse( { description: "Email was changed" })
  @ApiBadRequestResponse({ description: "Invalid email data" })
  @Put("/user/email")
  async changeEmail(@Body() changeEmailDto: ChangeEmailDto, @Query("userId", new ParseIntPipe()) userId: number) {
    return this.userService.changeEmail(changeEmailDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change account info" })
  @ApiQuery({ name: "userId", type: "number" })
  @ApiCreatedResponse({ description: "Account data was changed" })
  @ApiBadRequestResponse( { description: "Invalid account data" })
  @Put("/user/account")
  async changeAccountInfo(@Body() changeAccountDto: ChangeAccountDto, @Query("userId", new ParseIntPipe()) userId: number) {
    return this.userService.changeAccountInfo(changeAccountDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show own user's account info" })
  @ApiQuery({ name: "userId", type: "number" })
  @ApiOkResponse({ description: "Everything is OK" })
  @Get("/user/account")
  async accountInfo(@Query("userId", new ParseIntPipe()) userId: number, @Res() res: Response) {
    return this.userService.getAccountByUserId(userId);
  }
}
