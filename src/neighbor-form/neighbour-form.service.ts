import { Injectable, NotImplementedException } from "@nestjs/common";
import { SaveNeighborFormDto } from "./dto/save-neighbor-form.dto";
import { PrismaService } from "../prisma/prisma.service";
import { NeighbourForm } from "@prisma/client";

@Injectable()
export class NeighbourFormService {
  constructor(private prisma: PrismaService) {
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
}
