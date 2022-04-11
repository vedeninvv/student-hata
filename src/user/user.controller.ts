import { Body, Controller, Get, Param, Post, Put, Render, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangeAccountDto } from "./dto/change-account.dto";
import { Response } from "express";

// В 6 лабе userId будет получаться не прямой передачей в методе
@ApiTags("user")
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @ApiOperation({ summary: "Waiting for lab6..." })
  @Get("/login")
  @Render("login")
  async login() {
  }

  @ApiOperation({ summary: "Waiting for lab6..." })
  @Get("/registration")
  @Render("registration")
  async registration() {
  }

  @ApiOperation({ summary: "Create new user and blank account, which connected with user by one-to-one" })
  @Post("/user")
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change password" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Put("/user/:userId/password")
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Param("userId") userId: number) {
    return await this.userService.changePassword(changePasswordDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change email" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Put("/user/:userId/email")
  async changeEmail(@Body() changeEmailDto: ChangeEmailDto, @Param("userId") userId: number) {
    return await this.userService.changeEmail(changeEmailDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change account info" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Put("/user/:userId/account")
  async changeAccountInfo(@Body() changeAccountDto: ChangeAccountDto, @Param("userId") userId: number) {
    return await this.userService.changeAccountInfo(changeAccountDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show own user's account info" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Get("/user/:userId/account")
  async accountInfo(@Param("userId") userId: number, @Res() res: Response) {
    const account = await this.userService.getAccountByUserId(userId)
    res.render("account",
      { account: account }
    );
  }
}
