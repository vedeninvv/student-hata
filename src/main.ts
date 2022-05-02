import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { LoggingInterceptor } from "./logging.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import hbs = require("hbs");
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./http-exception.filter";
import supertokens from "supertokens-node";
import { SupertokensExceptionFilter } from "./auth/auth.filter";
require('dotenv').config();

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
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(), new SupertokensExceptionFilter());

  app.enableCors({
    origin: [process.env.API_DOMAIN],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
