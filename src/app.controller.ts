import { Controller, Get, Render } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get(["/", "/index"])
  @Render("index")
  root() {
  }

  @Get("/todoList")
  @Render("todoList")
  todoList() {
  }
}