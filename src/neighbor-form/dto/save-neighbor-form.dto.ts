import { ApiProperty } from "@nestjs/swagger";

export class SaveNeighborFormDto {
  @ApiProperty()
  universityId: number;
  @ApiProperty()
  faculty: string;
  @ApiProperty()
  preferredPrice: number;
  @ApiProperty()
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