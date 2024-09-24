import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordService } from "./password.service";
import { CookieService } from "./cookie.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UsersModule,
    // Сервис jwt, чтобы использовать его внутри модуля
    JwtModule.register({
      global: true, // модуль доступен глобально в приложении
      secret: process.env.JWT_SECRET, //key на основании которого будет генерироваться jwt
      signOptions: { expiresIn: "1d" } //Сколько будет доступен токен (1dень)
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, CookieService]
})
export class AuthModule {}
