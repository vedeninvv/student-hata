import { Module } from '@nestjs/common';
import {
  AppController,
  FlatsController,
  LoginController,
  NeighborFormController,
  NeighborsController,
  RegistrationController,
  RentFlatController,
  TodoListController,
} from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    FlatsController,
    LoginController,
    NeighborFormController,
    NeighborsController,
    RegistrationController,
    RentFlatController,
    TodoListController,
  ],
  providers: [AppService],
})
export class AppModule {}
