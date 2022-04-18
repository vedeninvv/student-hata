import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Render, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
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

  @ApiOperation({ summary: "Waiting for lab6..." })
  @Get("/login")
  @Render("login")
  login() {
  }

  @ApiOperation({ summary: "Waiting for lab6..." })
  @Get("/registration")
  @Render("registration")
  registration() {
  }

  @ApiOperation({ summary: "Create new user and blank account, which connected with user by one-to-one" })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @Post("/user")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change password" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @Put("/user/:userId/password")
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Param("userId", new ParseIntPipe()) userId: number) {
    return this.userService.changePassword(changePasswordDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change email" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @Put("/user/:userId/email")
  async changeEmail(@Body() changeEmailDto: ChangeEmailDto, @Param("userId", new ParseIntPipe()) userId: number) {
    return this.userService.changeEmail(changeEmailDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change account info" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @Put("/user/:userId/account")
  async changeAccountInfo(@Body() changeAccountDto: ChangeAccountDto, @Param("userId", new ParseIntPipe()) userId: number) {
    return this.userService.changeAccountInfo(changeAccountDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show own user's account info" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @Get("/user/:userId/account")
  async accountInfo(@Param("userId", new ParseIntPipe()) userId: number, @Res() res: Response) {
    return this.userService.getAccountByUserId(userId);
  }
}
