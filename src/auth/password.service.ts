import { Injectable } from "@nestjs/common";
import { randomBytes, pbkdf2Sync } from "crypto";

@Injectable()
export class PasswordService {
  // Генератор рандомной соли
  getSalt() {
    return randomBytes(16).toString("hex");
  }

  // Генератор хеша (пароль + соль)
  getHash(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  }
}
