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
}

@Controller()
export class FlatsController {
  constructor() {
  }

  @Get("/flats")
  @Render("flats")
  flats() {
  }

  @Get("/rent_flat")
  @Render("rent_flat")
  rentFlat() {
  }
}

@Controller()
export class AuthenticationController {
  constructor() {
  }

  @Get("/login")
  @Render("login")
  login() {
  }

  @Get("/registration")
  @Render("registration")
  registration() {
  }
}

@Controller()
export class NeighborsController {
  constructor() {
  }

  @Get("/neighbors")
  @Render("neighbors")
  neighbors() {
  }

  @Get("/neighbor_form")
  @Render("neighbor_form")
  neighborForm() {
  }
}

@Controller("/todoList")
export class TodoListController {
  constructor() {
  }

  @Get()
  @Render("todoList")
  todoList() {
  }
}