import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UniversityService {
  constructor(private prisma: PrismaService) {
  }

  async getAllUniversities() {
  }

  async getUniversityById(universityId: number) {
  }

  async getUniversitiesByIds(universitiesByIds: number[]) {
  }
}
