import { Injectable, NotFoundException } from "@nestjs/common";
import { SaveNeighborFormDto } from "./dto/save-neighbor-form.dto";
import { PrismaService } from "../prisma/prisma.service";
import { NeighbourForm } from "@prisma/client";
import { UserService } from "../user/user.service";
import { NeighbourFormWithAccountInfoDto } from "./dto/neighbour-form-with-account-info.dto";
import { GenderService } from "../gender/gender.service";

@Injectable()
export class NeighbourFormService {
  constructor(private prisma: PrismaService, private userService: UserService, private genderService: GenderService) {
  }

  async getAllNeighbourForms(): Promise<NeighbourForm[]> {
    return this.prisma.neighbourForm.findMany();
  }

  async getNeighbourFormByUserId(userId: string): Promise<NeighbourForm> {
    return this.prisma.neighbourForm.findUnique({
      where: { userId: userId },
      include: { preferredGenders: true },
      rejectOnNotFound: () => {
        throw new NotFoundException("NeighbourForm not found");
      }
    });
  }

  async saveNeighbourForm(saveNeighborFormDto: SaveNeighborFormDto, userId: string): Promise<NeighbourForm> {
    try {
      await this.deleteNeighbourForm(userId);
    } catch (e) {
    }
    const neighbourForm = await this.prisma.neighbourForm.create({
      data:
        {
          user: { connect: { id: userId } },
          university: { connect: { id: saveNeighborFormDto.universityId } },
          faculty: saveNeighborFormDto.faculty,
          preferredPrice: saveNeighborFormDto.preferredPrice,
          preferredPeopleNum: saveNeighborFormDto.preferredPeopleNum,
          preferredArea: saveNeighborFormDto.preferredArea,
          requirementsForNeighbour: saveNeighborFormDto.requirementsForNeighbour,
          aboutMyself: saveNeighborFormDto.aboutMyself
        }
    });
    for (let i = 0; i < saveNeighborFormDto.preferredGenders.length; i++) {
      let genderId = saveNeighborFormDto.preferredGenders[i];
      await this.prisma.preferredGendersOnNeighbourForms.create({
        data:
          {
            neighbourForm: { connect: { id: Number(neighbourForm.id) } },
            gender: { connect: { id: Number(genderId) } }
          }
      });
    }
    return neighbourForm;
  }


  async deleteNeighbourForm(userId: string): Promise<NeighbourForm> {
    try {
      return await this.prisma.neighbourForm.delete({
        where: { userId: userId },
        include: { preferredGenders: true }
      });
    } catch (e) {
      throw new NotFoundException("NeighbourForm not found when try to delete");
    }
  }

  async getAllNeighbourFormsWithAccountInfo(): Promise<NeighbourFormWithAccountInfoDto[]> {
    const neighbourForms = await this.prisma.neighbourForm.findMany({
      include: {
        preferredGenders: true,
        university: true
      }
    });
    const allNeighbours = [];
    for (let i = 0; i < neighbourForms.length; i++) {
      const neighbourForm = neighbourForms[i];
      const account = await this.userService.getAccountByUserId(neighbourForm.userId);
      const gender = await this.genderService.getGenderById(account.genderId);
      let preferredGendersString = "";
      for (let preferredGender in neighbourForm.preferredGenders) {
        preferredGendersString += (await this.genderService.getGenderById(Number(preferredGender))).genderName + " ";
      }
      let neighbourFormWithAccountInfoDto = new NeighbourFormWithAccountInfoDto();
      neighbourFormWithAccountInfoDto.name = account.name;
      neighbourFormWithAccountInfoDto.surname = account.surname;
      neighbourFormWithAccountInfoDto.gender = gender.genderName;
      neighbourFormWithAccountInfoDto.university = neighbourForm.university.name;
      neighbourFormWithAccountInfoDto.faculty = neighbourForm.faculty;
      neighbourFormWithAccountInfoDto.preferredPrice = neighbourForm.preferredPrice;
      neighbourFormWithAccountInfoDto.preferredPeopleNum = neighbourForm.preferredPeopleNum;
      neighbourFormWithAccountInfoDto.preferredArea = neighbourForm.preferredArea;
      neighbourFormWithAccountInfoDto.requirementsForNeighbor = neighbourForm.requirementsForNeighbour;
      neighbourFormWithAccountInfoDto.aboutMyself = neighbourForm.aboutMyself;
      neighbourFormWithAccountInfoDto.preferredGenders = preferredGendersString;
      allNeighbours.push(neighbourFormWithAccountInfoDto);
    }
    return allNeighbours;
  }
}
