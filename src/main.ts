import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { LoggingInterceptor } from "./logging.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import hbs = require("hbs");

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");
  app.useGlobalInterceptors(new LoggingInterceptor());

  hbs.registerPartials(join(__dirname, "..", "views", "partials"));

  const config = new DocumentBuilder()
    .setTitle("Student Hata")
    .setDescription("A simple service for posting flats and searching for neighbors")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
