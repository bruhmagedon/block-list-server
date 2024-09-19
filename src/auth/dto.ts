import { ApiProperty } from "@nestjs/swagger";

export class SignUpBodyDto {
  @ApiProperty({
    example: "test@gmail.com"
  }) // декоратор для Swagger
  email: string;

  @ApiProperty({
    example: "1234"
  })
  password: string;
}

export class SignInBodyDto {
  @ApiProperty({
    example: "test@gmail.com"
  })
  email: string;

  @ApiProperty({
    example: "1234"
  })
  password: string;
}

export class GetSessionInfoDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  "iat": number; //когда выдан токен
  @ApiProperty()
  "exp": number; //когда он истекает
}
