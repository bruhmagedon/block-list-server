import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { GetSessionInfoDto, SignUpBodyDto } from "./dto";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { CookieService } from "./cookie.service";
import { AuthGuard } from "./auth.guard";
import { SessionInfo } from "./session-info.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private coockieService: CookieService
  ) {}

  @Post("sign-up")
  @ApiCreatedResponse() //Возвращаемое значение (доп декоратор, метод не может получить возвращаемое значение из dto)
  async signUp(@Body() body: SignUpBodyDto, @Res({ passthrough: true }) res: Response) {
    // Модель тела запроса (автоматически берет мета-информацию)
    const { accessToken } = await this.authService.signUp(body.email, body.password);
    this.coockieService.setToken(res, accessToken);
  }

  @Post("sign-in")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignUpBodyDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.signIn(body.email, body.password);
    this.coockieService.setToken(res, accessToken);
  }

  @Post("sign-out")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard) //неавторизованный пользовать не может вызвать этот метод (signOut)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.coockieService.removeToken(res);
  }

  @Get("session")
  @ApiOkResponse({
    // Тип возвращаемого значения
    type: GetSessionInfoDto
  })
  @UseGuards(AuthGuard)
  getSessingInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
}
