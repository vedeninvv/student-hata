import { ApiProperty } from "@nestjs/swagger";

export class FlatPostDto {
  @ApiProperty()
  address: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
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