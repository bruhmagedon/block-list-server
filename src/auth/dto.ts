import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpBodyDto {
  @ApiProperty({
    example: "test@gmail.com"
  }) // декоратор для Swagger
  @IsEmail() //валидация
  email: string;

  @ApiProperty({
    example: "1234"
  })
  @IsNotEmpty()
  password: string;
}

export class SignInBodyDto {
  @ApiProperty({
    example: "test@gmail.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "1234"
  })
  @IsNotEmpty()
  password: string;
}

export class GetSessionInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  "iat": number; //когда выдан токен
  @ApiProperty()
  "exp": number; //когда он истекает
}
