import { DynamicModule, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { AuthMiddleware } from "./auth.middleware";
import { AuthModuleConfig, ConfigInjectionToken } from "./config.interface";
import { SupertokensService } from "./supertokens/supertokens.service";
import { UserModule } from "../user/user.module";

@Module({
  providers: [],
  exports: [],
  controllers: []
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }

  static forRoot({ connectionURI, apiKey, appInfo }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey
          },
          provide: ConfigInjectionToken
        },
        SupertokensService
      ],
      exports: [],
      imports: [UserModule],
      module: AuthModule
    };
  }
}