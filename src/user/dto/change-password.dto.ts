import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;
  @ApiProperty()
  @IsNotEmpty()
  oldPassword: string;
}