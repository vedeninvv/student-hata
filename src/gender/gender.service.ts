import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Gender } from "@prisma/client";

@Injectable()
export class GenderService {
  constructor(private prisma: PrismaService) {
  }

  async getAllGenders() {
  }

  async getGenderById(genderId: number) {
  }

  async getGendersByIds(gendersIds: number[]): Promise<Gender[]> {
    let genders = [];
    for (let genderId in gendersIds) {
      genders.push(
        this.prisma.gender.findUnique({ where: { id: Number(genderId) } })
      );
    }
    return genders;
  }
}
