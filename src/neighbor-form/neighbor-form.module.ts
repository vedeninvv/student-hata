import { Module } from "@nestjs/common";
import { NeighborFormController } from "./neighbor-form.controller";
import { NeighborFormService } from "./neighbor-form.service";
import { PrismaModule } from "../prisma/prisma.module";
import { GenderModule } from "../gender/gender.module";
import { UniversityModule } from "../university/university.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [PrismaModule, GenderModule, UniversityModule, UserModule],
  controllers: [NeighborFormController],
  providers: [NeighborFormService]
})
export class NeighborFormModule {
}
