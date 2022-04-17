import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Gender } from "@prisma/client";

@Injectable()
export class GenderService {
  constructor(private prisma: PrismaService) {
  }

  async getAllGenders() {
    return this.prisma.gender.findMany();
  }

  async getGenderById(genderId: number) {
    return this.prisma.gender.findUnique({
      where: { id: genderId }
    });
  }

  async getGendersByIds(gendersIds: number[]): Promise<Gender[]> {
    return this.prisma.gender.findMany({
        where: {
          id: { in: gendersIds }
        }
      }
    );
  }
}
