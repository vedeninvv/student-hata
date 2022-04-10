import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  oldPassword: string;
}