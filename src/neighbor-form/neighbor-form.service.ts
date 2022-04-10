import { Injectable, NotImplementedException } from "@nestjs/common";
import { SaveNeighborFormDto } from "./dto/save-neighbor-form.dto";

@Injectable()
export class NeighborFormService {
  async getAllNeighborForms() {
    throw new NotImplementedException();
  }

  async getNeighborFormByUserId(userId: number) {
    throw new NotImplementedException();
  }

  async saveNeighborForm(saveNeighborFormDto: SaveNeighborFormDto, userId: number) {
    throw new NotImplementedException();
  }

  async deleteNeighborForm(userId: number) {
    throw new NotImplementedException();
  }
}
