import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class ChangeAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  surname: string;
  @ApiProperty()
  @IsInt()
  genderId: number;
  @ApiProperty()
  @IsEmail()
  contactEmail: string;
  @ApiProperty()
  phone: string;
}