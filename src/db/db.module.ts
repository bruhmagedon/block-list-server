import { Module } from "@nestjs/common";
import { DbService } from "./db.service";

@Module({
  providers: [DbService],
  exports: [DbService] //чтоб использовать сервис по всему приложению
})
export class DbModule {}
