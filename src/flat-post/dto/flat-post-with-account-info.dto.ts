import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";
import { FlatPost } from "@prisma/client";

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


  constructor(flatPost: FlatPost,
              preferredUniversities: string, undesirableUniversities: string, name: string, surname: string) {
    this.address = flatPost.address;
    this.price = flatPost.price;
    this.maxPeople = flatPost.maxPeople;
    this.description = flatPost.description;
    this.requirements = flatPost.requirements;
    this.preferredUniversities = preferredUniversities;
    this.undesirableUniversities = undesirableUniversities;
    this.name = name;
    this.surname = surname;
  }

// coming soon...
  //flatPostPhotoId: number
}