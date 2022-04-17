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
  requirementsForNeighbor: string;
  @ApiProperty()
  aboutMyself: string;
  @ApiProperty()
  preferredGenders: string;


  constructor(name: string, surname: string, gender: string, university: string, faculty: string, preferredPrice: number,
              preferredPeopleNum: number, preferredArea: string, requirementsForNeighbor: string, aboutMyself: string,
              preferredGenders: string) {
    this.name = name;
    this.surname = surname;
    this.gender = gender;
    this.university = university;
    this.faculty = faculty;
    this.preferredPrice = preferredPrice;
    this.preferredPeopleNum = preferredPeopleNum;
    this.preferredArea = preferredArea;
    this.requirementsForNeighbor = requirementsForNeighbor;
    this.aboutMyself = aboutMyself;
    this.preferredGenders = preferredGenders;
  }
}