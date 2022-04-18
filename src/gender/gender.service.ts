import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Gender } from "@prisma/client";

@Injectable()
export class GenderService {
  constructor(private prisma: PrismaService) {
  }

  async getAllGenders(): Promise<Gender[]> {
  }

  async getGenderById(genderId: number): Promise<Gender> {
  }

  async getGendersByIds(gendersIds: number[]): Promise<Gender[]> {

  }
}
