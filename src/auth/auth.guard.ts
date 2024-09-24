import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { CookieService } from "./cookie.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
// Guard - ограничение доступа (проверяет сессию и записывает инфу о токене в repsonse)
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request;

    // Получение куков по ключу (статическому)
    const token = req.cookies[CookieService.tokenKey];

    // Токена нет
    if (!token) {
      throw new UnauthorizedException();
    }

    // Парсинг токена
    try {
      const sessionInfo = this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });

      req["session"] = sessionInfo; //Записали в реквест информацию о текущей сессии
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
