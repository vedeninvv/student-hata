import { Injectable } from "@nestjs/common";
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

  async getNeighbourFormByUserId(userId: number): Promise<NeighbourForm> {
    return this.prisma.neighbourForm.findUnique({
      where: { userId: userId },
      rejectOnNotFound: null
    });
  }

  async saveNeighbourForm(saveNeighborFormDto: SaveNeighborFormDto, userId: number): Promise<NeighbourForm> {
    await this.deleteNeighbourForm(userId);
    const neighbourForm = await this.prisma.neighbourForm.create({
      data:
        {
          user: { connect: { id: userId } },
          university: { connect: { id: saveNeighborFormDto.universityId } },
          faculty: saveNeighborFormDto.faculty,
          preferredPrice: saveNeighborFormDto.preferredPrice,
          preferredPeopleNum: saveNeighborFormDto.preferredPeopleNum,
          preferredArea: saveNeighborFormDto.preferredArea,
          requirementsForNeighbour: saveNeighborFormDto.requirementsForNeighbor,
          aboutMyself: saveNeighborFormDto.aboutMyself
        }
    });
    for (let genderId in saveNeighborFormDto.preferredGenders) {
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


  async deleteNeighbourForm(userId: number): Promise<NeighbourForm> {
    try {
      return await this.prisma.neighbourForm.delete({
        where: { userId: userId },
        include: { preferredGenders: true }
      });
    } catch (e) {
      return null;
    }
  }

  async getAllNeighbourFormsWithAccountInfo() {
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
      if (!account.filled) {
        continue
      }
      const gender = await this.genderService.getGenderById(account.genderId);
      let preferredGendersString = "";
      for (let preferredGender in neighbourForm.preferredGenders) {
        preferredGendersString += (await this.genderService.getGenderById(Number(preferredGender))).genderName + " ";
      }
      allNeighbours.push(new NeighbourFormWithAccountInfoDto(
          account.name != null? account.name: "Не задано",
          account.surname != null? account.surname: "Не задано",
          gender.genderName != null? gender.genderName: "Не задано",
          neighbourForm.university.name,
          neighbourForm.faculty,
          neighbourForm.preferredPrice,
          neighbourForm.preferredPeopleNum,
          neighbourForm.preferredArea,
          neighbourForm.requirementsForNeighbour,
          neighbourForm.aboutMyself,
          preferredGendersString
        )
      );
    }
    return allNeighbours;
  }
}
