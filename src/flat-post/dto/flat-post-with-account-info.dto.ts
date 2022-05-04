import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class FlatPostWithAccountInfoDto {
  @ApiProperty()
  address: string;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  price: number;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  maxPeople: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  requirements: string;
  @ApiProperty()
  preferredUniversities: string;
  @ApiProperty()
  undesirableUniversities: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
}