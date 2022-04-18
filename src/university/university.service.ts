import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UniversityService {
  constructor(private prisma: PrismaService) {
  }

  async getAllUniversities() {
    return this.prisma.university.findMany();
  }

  async getUniversityById(universityId: number) {
    return this.prisma.university.findUnique({
      where: { id: universityId }
    });
  }

  async getUniversitiesByIds(universitiesByIds: number[]) {
    return this.prisma.university.findMany({
      where: {
        id: { in: universitiesByIds }
      }
    });
  }
}
