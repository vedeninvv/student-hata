import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, Min } from "class-validator";

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
  @ApiProperty()
  preferredUniversityIds: number[];
  @ApiProperty()
  undesirableUniversityIds: number[];

  // coming soon...
  //flatPostPhotoId: number
}