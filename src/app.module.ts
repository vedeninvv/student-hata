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
require('dotenv').config();

@Module({
  imports: [UserModule, FlatPostModule, NeighborFormModule, PrismaModule, GenderModule, UniversityModule,
    AuthModule.forRoot({
      connectionURI: process.env.CONNECTIOIN_URI,
      apiKey: process.env.API_KEY,
      appInfo: {
        appName: process.env.APP_NAME,
        apiDomain: process.env.API_DOMAIN,
        websiteDomain: process.env.WEBSITE_DOMAIN,
        apiBasePath: process.env.API_BASE_PATH,
        websiteBasePath: process.env.WEBSITE_BASE_PATH
      }
    })],
  controllers: [
    AppController
  ],
  providers: [AppService]
})
export class AppModule {
}
