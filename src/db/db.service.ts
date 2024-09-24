import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
// dependensy injection (инициализация призмы)
export class DbService extends PrismaClient implements OnModuleInit {
  // инциализация модуля
  async onModuleInit() {
    await this.$connect();
  }
}
