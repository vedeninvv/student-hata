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

  @Get("/flats")
  @Render("flats")
  flats() {
  }

  @Get("/rent_flat")
  @Render("rent_flat")
  rentFlat() {
  }

  @Get("/login")
  @Render("login")
  login() {
  }

  @Get("/registration")
  @Render("registration")
  registration() {
  }

  @Get("/neighbors")
  @Render("neighbors")
  neighbors() {
  }

  @Get("/neighbor_form")
  @Render("neighbor_form")
  neighborForm() {
  }

  @Get("/todoList")
  @Render("todoList")
  todoList() {
  }
}