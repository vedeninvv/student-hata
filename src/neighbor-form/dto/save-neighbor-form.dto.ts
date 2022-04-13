import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class SaveNeighborFormDto {
  @ApiProperty()
  universityId: number;
  @ApiProperty()
  faculty: string;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  preferredPrice: number;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  preferredPeopleNum: number;
  @ApiProperty()
  preferredArea: string;
  @ApiProperty()
  requirementsForNeighbor: string;
  @ApiProperty()
  aboutMyself: string;
  @ApiProperty()
  preferredGenders: number[];
}