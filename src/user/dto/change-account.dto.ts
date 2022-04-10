import { ApiProperty } from "@nestjs/swagger";

export class ChangeAccountDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  genderId: number;
  @ApiProperty()
  contactEmail: string;
  @ApiProperty()
  phone: string;
}