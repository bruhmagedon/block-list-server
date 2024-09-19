import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Конфиг сваггера
  const config = new DocumentBuilder().setTitle("Block list").build();
  const document = SwaggerModule.createDocument(app, config);
  // Где хостить сваггер
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
}
bootstrap();
