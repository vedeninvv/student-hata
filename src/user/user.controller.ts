import { Controller, Get, Render } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/login")
  @Render("login")
  login() {
  }

  @Get("/registration")
  @Render("registration")
  registration() {
  }
}
