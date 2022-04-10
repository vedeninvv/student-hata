import { Module } from "@nestjs/common";
import { FlatPostController } from "./flat-post.controller";
import { FlatPostService } from "./flat-post.service";
import { PrismaModule } from "../prisma/prisma.module";
import { GenderModule } from "../gender/gender.module";
import { UserModule } from "../user/user.module";
import { UniversityModule } from "../university/university.module";

@Module({
  imports: [PrismaModule, GenderModule, UserModule, UniversityModule],
  controllers: [FlatPostController],
  providers: [FlatPostService]
})
export class FlatPostModule {
}
