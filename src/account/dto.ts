import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";

export class AccountDto {
  @ApiProperty()
  id: number; //id аккаунта

  @ApiProperty()
  ownerId: number; //юзер, которому принадлежит аккаунт

  @ApiProperty()
  @IsBoolean()
  isBlockingEnabled: boolean; //включена блокировака или нет
}

// редактирование аккаунта (блокировки)
export class PatchAccountDto {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isBlockingEnabled?: boolean;
}
