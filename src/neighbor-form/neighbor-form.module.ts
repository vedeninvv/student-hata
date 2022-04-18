import { Module } from "@nestjs/common";
import { NeighbourFormController } from "./neighbour-form.controller";
import { NeighbourFormService } from "./neighbour-form.service";
import { PrismaModule } from "../prisma/prisma.module";
import { GenderModule } from "../gender/gender.module";
import { UniversityModule } from "../university/university.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [PrismaModule, GenderModule, UniversityModule, UserModule],
  controllers: [NeighbourFormController],
  providers: [NeighbourFormService]
})
export class NeighborFormModule {
}