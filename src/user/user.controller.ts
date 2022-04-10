import { Body, Controller, Get, Param, Post, Put, Render } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
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
  @Post("/user")
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change password" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Put("/user/:userId/password")
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Param("userId") userId: number) {
    return this.userService.changePassword(changePasswordDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change email" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Put("/user/:userId/email")
  changeEmail(@Body() changeEmailDto: ChangeEmailDto, @Param("userId") userId: number) {
    return this.userService.changeEmail(changeEmailDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Change account info" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Put("/user/:userId/account")
  changeAccountInfo(@Body() changeAccountDto: ChangeAccountDto, @Param("userId") userId: number) {
    return this.userService.changeAccountInfo(changeAccountDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Show own user's account info" })
  @ApiParam({ name: "userId", type: "number", description: "Will be removed in lab6" })
  @Get("/user/:userId/account")
  accountInfo(@Param("userId") userId: number) {
    return this.userService.getAccountById(userId);
  }
}
