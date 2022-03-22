import { Controller, Get, Render } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get(["/", "/index"])
  @Render("index")
  root() {}
}

@Controller()
export class FlatsController {
  constructor(private readonly appService: AppService) {
  }

  @Get("/flats")
  @Render("flats")
  flats() {
    return;
  }

  @Get("/rent_flat")
  @Render("rent_flat")
  rentFlat() {
    return;
  }
}

@Controller()
export class AuthenticationController {
  constructor(private readonly appService: AppService) {
  }

  @Get("/login")
  @Render("login")
  login() {
    return;
  }

  @Get("/registration")
  @Render("registration")
  registration() {
    return;
  }
}

@Controller()
export class NeighborsController {
  constructor(private readonly appService: AppService) {
  }

  @Get("/neighbors")
  @Render("neighbors")
  neighbors() {
    return;
  }

  @Get("/neighbor_form")
  @Render("neighbor_form")
  neighborForm() {
    return;
  }
}

@Controller("/todoList")
export class TodoListController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  @Render("todoList")
  todoList() {
    return;
  }
}