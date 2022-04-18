import { Injectable, NotImplementedException } from "@nestjs/common";
import { FlatPostDto } from "./dto/flat-post.dto";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { UniversityService } from "../university/university.service";
import { FlatPost } from "@prisma/client";


@Injectable()
export class FlatPostService {
  constructor(private prisma: PrismaService, private userService: UserService,
              private universityService: UniversityService) {
  }

  async getAllFlatPosts(): Promise<FlatPost[]> {
    throw new NotImplementedException();
  }

  async createNewFlatPost(createFlatPostDto: FlatPostDto, userId: number): Promise<FlatPost> {
    throw new NotImplementedException();
  }

  async findFlatPostById(flatId: number, userId: number): Promise<FlatPost> {
    throw new NotImplementedException();
  }

  async changeFlatPost(flatPostDto: FlatPostDto, flatId: number, userId: number): Promise<FlatPost> {
    throw new NotImplementedException();
  }

  async deleteFlatPost(flatId: number, userId: number): Promise<FlatPost> {
    throw new NotImplementedException();
  }
}
