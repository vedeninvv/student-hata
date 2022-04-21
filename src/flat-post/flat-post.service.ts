import { Injectable, NotImplementedException } from "@nestjs/common";
import { FlatPostDto } from "./dto/flat-post.dto";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { FlatPostWithAccountInfoDto } from "./dto/flat-post-with-account-info.dto";
import { UniversityService } from "../university/university.service";
import { FlatPost } from "@prisma/client";

@Injectable()
export class FlatPostService {
  constructor(private prisma: PrismaService, private userService: UserService,
              private universityService: UniversityService) {
  }

  async getAllFlatPosts(): Promise<FlatPost[]> {
    return this.prisma.flatPost.findMany();
  }

  async getAllFlatPostsWithAccountInfo(): Promise<FlatPostWithAccountInfoDto[]> {
    const flatPosts = await this.prisma.flatPost.findMany({
      include: {
        author: true,
        preferredUniversities: true,
        undesirableUniversities: true
      }
    });
    const flatPostsWithAccountInfoDto = [];
    for (let i = 0; i < flatPosts.length; i++) {
      const flatPost = flatPosts[i];
      const account = await this.userService.getAccountByUserId(flatPost.author.id);
      if (!account.filled) {
        continue;
      }
      let preferredUniversitiesString = "";
      for (let preferredUniversity in flatPost.preferredUniversities) {
        preferredUniversitiesString += (await this.universityService
          .getUniversityById(Number(preferredUniversity))).name + " ";
      }
      let undesirableUniversitiesString = "";
      for (let undesirableUniversity in flatPost.undesirableUniversities) {
        undesirableUniversitiesString += (await this.universityService
          .getUniversityById(Number(undesirableUniversity))).name + " ";
      }
      flatPostsWithAccountInfoDto.push(
        new FlatPostWithAccountInfoDto(
          flatPost,
          preferredUniversitiesString,
          undesirableUniversitiesString,
          account.name,
          account.surname
        )
      );
    }
    return flatPostsWithAccountInfoDto;
  }

  async createNewFlatPost(createFlatPostDto: FlatPostDto, userId: number): Promise<FlatPost> {
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

  async findFlatPostById(flatId: number, userId: number): Promise<FlatPost> {
    const flatPost = await this.prisma.flatPost.findUnique({
      where: { id: flatId },
      rejectOnNotFound:
        () => {
          throw new HttpException("Flat not found", HttpStatus.NOT_FOUND);
        }
    });
    if (flatPost.authorId != userId)
      throw new HttpException("Request was not sent by the author of flat", HttpStatus.FORBIDDEN);
    return flatPost;
  }

  async changeFlatPost(flatPostDto: FlatPostDto, flatId: number, userId: number): Promise<FlatPost> {
    const flatPost = await this.findFlatPostById(flatId, userId);
    this.deleteFlatPost(flatId, userId);
    return this.createNewFlatPost(flatPostDto, userId);
  }

  async deleteFlatPost(flatId: number, userId: number): Promise<FlatPost> {
    const flatPost = await this.findFlatPostById(flatId, userId);
    return this.prisma.flatPost.delete({
      where: {
        id: flatId
      }
    });
  }
}
