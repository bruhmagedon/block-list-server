import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Конфиг сваггера
  const config = new DocumentBuilder().setTitle("Block list").build();
  const document = SwaggerModule.createDocument(app, config);

  // Где хостить сваггер
  SwaggerModule.setup("api", app, document);

  // Глобальная middleware (добавит в реквесты распаршенные куки, в респонсе можно будет их использовать)
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
