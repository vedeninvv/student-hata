import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "../prisma/prisma.module";
import { GenderModule } from "../gender/gender.module";

@Module({
  imports: [PrismaModule, GenderModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
}
