import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { FlatPostModule } from "./flat-post/flat-post.module";
import { NeighborFormModule } from "./neighbor-form/neighbor-form.module";
import { PrismaModule } from "./prisma/prisma.module";
import { GenderModule } from "./gender/gender.module";
import { UniversityModule } from "./university/university.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [UserModule, FlatPostModule, NeighborFormModule, PrismaModule, GenderModule, UniversityModule,
    AuthModule.forRoot({
      connectionURI: "https://082679e1c56911eca199e7bd956c96c9-ap-southeast-1.aws.supertokens.io:3573",
      apiKey: "uBYyv5UBI3mcYVbajHftfbHgvp=xBq",
      appInfo: {
        appName: "student-hata",
        apiDomain: "http://localhost:12345",
        websiteDomain: "http://localhost:12345",
        apiBasePath: "/auth",
        websiteBasePath: "/test"
      }
    })],
  controllers: [
    AppController
  ],
  providers: [AppService]
})
export class AppModule {
}
