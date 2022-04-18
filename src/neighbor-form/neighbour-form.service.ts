import { Injectable, NotImplementedException } from "@nestjs/common";
import { SaveNeighborFormDto } from "./dto/save-neighbor-form.dto";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { GenderService } from "../gender/gender.service";
import { NeighbourForm } from "@prisma/client";

@Injectable()
export class NeighbourFormService {
  constructor(private prisma: PrismaService, private userService: UserService, private genderService: GenderService) {
  }
  async getAllNeighbourForms(): Promise<NeighbourForm[]> {
    throw new NotImplementedException();
  }

  async getNeighbourFormByUserId(userId: number): Promise<NeighbourForm> {
    throw new NotImplementedException();
  }

  async saveNeighbourForm(saveNeighborFormDto: SaveNeighborFormDto, userId: number): Promise<NeighbourForm> {
    throw new NotImplementedException();
  }

  async deleteNeighbourForm(userId: number): Promise<NeighbourForm> {
    throw new NotImplementedException();
  }
}
