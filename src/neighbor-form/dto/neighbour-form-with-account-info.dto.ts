import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class NeighbourFormWithAccountInfoDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  university: string;
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
  requirementsForNeighbour: string;
  @ApiProperty()
  aboutMyself: string;
  @ApiProperty()
  preferredGenders: string;
}