import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/index')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return;
  }
}

@Controller('/flats')
export class FlatsController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('flats')
  flats() {
    return;
  }
}

@Controller('/login')
export class LoginController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('login')
  login() {
    return;
  }
}

@Controller('/neighbor_form')
export class NeighborFormController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('neighbor_form')
  neighborForm() {
    return;
  }
}

@Controller('/neighbors')
export class NeighborsController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('neighbors')
  neighbors() {
    return;
  }
}

@Controller('/registration')
export class RegistrationController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('registration')
  registration() {
    return;
  }
}

@Controller('/rent_flat')
export class RentFlatController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('rent_flat')
  rentFlat() {
    return;
  }
}

@Controller('/todoList')
export class TodoListController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('todoList')
  todoList() {
    return;
  }
}
