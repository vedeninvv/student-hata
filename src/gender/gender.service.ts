import { Injectable, NotImplementedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Gender } from "@prisma/client";

@Injectable()
export class GenderService {
  constructor(private prisma: PrismaService) {
  }

  async getAllGenders(): Promise<Gender[]> {
    throw new NotImplementedException();
  }

  async getGenderById(genderId: number): Promise<Gender> {
    throw new NotImplementedException();
  }

  async getGendersByIds(gendersIds: number[]): Promise<Gender[]> {
    throw new NotImplementedException();
  }
}
