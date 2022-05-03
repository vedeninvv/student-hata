import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsPositive } from "class-validator";

export class FlatPostDto {
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
  @ApiProperty({ type: [Number] })
  @IsArray()
  preferredUniversityIds: number[];
  @ApiProperty({ type: [Number] })
  @IsArray()
  undesirableUniversityIds: number[];
}