import { Injectable } from "@nestjs/common";
import { PatchAccountDto } from "./dto";
import { DbService } from "src/db/db.service";

@Injectable()
export class AccountService {
  constructor(private db: DbService) {} //доступ к бд

  // Создание аккаунта
  async create(userId: number) {
    return this.db.account.create({
      data: {
        ownerId: userId,
        isBlockingEnabled: false //значение по умолчанию
      }
    });
  }

  // Получение аккаунта
  async getAccount(userId: number) {
    // Возвращает аккаунт или ошибку что его нету
    return this.db.account.findUniqueOrThrow({ where: { ownerId: userId } });
  }

  // Редактирование аккаунта
  async patchAccount(userId: number, patch: PatchAccountDto) {
    return this.db.account.update({
      where: { ownerId: userId },
      data: { ...patch }
    });
  }
}
