import { Injectable } from "@nestjs/common";
import { FlatPostDto } from "./dto/flat-post.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FlatPostService {
  constructor(private prisma: PrismaService) {
  }

  async getAllFlatPosts() {
    return this.prisma.flatPost.findMany();
  }

  async createNewFlatPost(createFlatPostDto: FlatPostDto, userId: number) {
    const flatPosts = await this.prisma.flatPost.create({
      data: {
        address: createFlatPostDto.address,
        price: createFlatPostDto.price,
        maxPeople: createFlatPostDto.maxPeople,
        description: createFlatPostDto.description,
        requirements: createFlatPostDto.requirements,
        author: { connect: { id: userId } }
      }
    });
    for (let preferredUniversityId in createFlatPostDto.preferredUniversityIds) {
      await this.prisma.flatPostOnUniversityPreferred.create({
        data: {
          flatPost: { connect: { id: flatPosts.id } },
          university: { connect: { id: Number(preferredUniversityId) } }
        }
      });
    }
    for (let undesirableUniversityId in createFlatPostDto.undesirableUniversityIds) {
      await this.prisma.flatPostOnUniversityUndesirable.create({
        data: {
          flatPost: { connect: { id: flatPosts.id } },
          university: { connect: { id: Number(undesirableUniversityId) } }
        }
      });
    }
    return flatPosts;
  }

  async findFlatPostById(flatId: number, userId: number) {
    const flatPost = await this.prisma.flatPost.findUnique({
      where: { id: flatId },
      rejectOnNotFound: null
    });
    if (flatPost.authorId != userId)
      return null;
    return flatPost;
  }

  async changeFlatPost(flatPostDto: FlatPostDto, flatId: number, userId: number) {
    const flatPost = await this.findFlatPostById(flatId, userId);
    if (flatPost == null)
      return null;
    this.deleteFlatPost(flatId, userId);
    this.createNewFlatPost(flatPostDto, userId);
  }

  async deleteFlatPost(flatId: number, userId: number) {
    const flatPost = await this.findFlatPostById(flatId, userId);
    if (flatPost == null)
      return null;
    return this.prisma.flatPost.delete({
      where: {
        id: flatId
      }
    });
  }
}
