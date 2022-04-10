import { Injectable, NotImplementedException } from "@nestjs/common";
import { FlatPostDto } from "./dto/flat-post.dto";

@Injectable()
export class FlatPostService {
  async getAllFlatPosts() {
    throw new NotImplementedException();
  }

  async createNewFlatPost(createFlatPostDto: FlatPostDto, userId: number) {
    throw new NotImplementedException();
  }

  async findFlatPostById(flatId: number) {
    throw new NotImplementedException();
  }

  changeFlatPost(flatPostDto: FlatPostDto, flatId: number, userId: number) {
    throw new NotImplementedException();
  }

  deleteFlatPost(flatId: number, userId: number) {
    throw new NotImplementedException();
  }
}
