import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ChangeAccountDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  genderId: number;
  @ApiProperty()
  @IsEmail()
  contactEmail: string;
  @ApiProperty()
  phone: string;
}