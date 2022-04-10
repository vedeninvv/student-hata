import { Module } from "@nestjs/common";
import {
  AppController,
} from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from './user/user.module';
import { FlatPostModule } from './flat-post/flat-post.module';
import { NeighborFormModule } from './neighbor-form/neighbor-form.module';
import { PrismaModule } from './prisma/prisma.module';
import { GenderModule } from './gender/gender.module';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [UserModule, FlatPostModule, NeighborFormModule, PrismaModule, GenderModule, UniversityModule],
  controllers: [
    AppController,
  ],
  providers: [AppService]
})
export class AppModule {
}
