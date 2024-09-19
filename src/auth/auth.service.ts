import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { PasswordService } from "./password.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService
  ) {}

  // Создание пользователя
  async signUp(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    // Если такой юзер уже существует
    if (user) {
      throw new BadRequestException({ type: "email-exists" });
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.usersService.create(email, hash, salt);

    const accessToken = await this.jwtService.signAsync({ id: newUser.id, email: newUser.email });

    // Сгенерировать accessToken, передали дальше, чтобы использовать его в других сервисах
    return { accessToken };
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    // Если юзера не существует
    if (!user) {
      throw new UnauthorizedException();
    }

    const hash = this.passwordService.getHash(password, user.salt);

    // Сверяем хеши, если не верны - ошибка авторизации
    if (hash !== user.hash) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({ id: user.id, email: user.email });

    // Сгенерировать accessToken, передали дальше, чтобы использовать его в других сервисах
    return { accessToken };
  }
}
