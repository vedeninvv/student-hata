import { Module } from "@nestjs/common";
import {
  AppController,
  AuthenticationController,
  FlatsController,
  NeighborsController,
  TodoListController
} from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [
    AppController,
    FlatsController,
    NeighborsController,
    TodoListController,
    AuthenticationController
  ],
  providers: [AppService]
})
export class AppModule {
}
