import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

  async getFlatPostsWithAccountInfo(start: number, end: number): Promise<FlatPostWithAccountInfoDto[]> {
    const flatPosts = await this.prisma.flatPost.findMany({
      skip: start,
      take: end - start,
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
      let preferredUniversitiesString = "";
      for (let i = 0; i < flatPost.preferredUniversities.length; i++) {
        let preferredUniversity = flatPost.preferredUniversities[i].universityId;
        preferredUniversitiesString += (await this.universityService
          .getUniversityById(Number(preferredUniversity))).name + " ";
      }
      let undesirableUniversitiesString = "";
      for (let i = 0; i < flatPost.undesirableUniversities.length; i++) {
        let undesirableUniversity = flatPost.undesirableUniversities[i].universityId;
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

  async createNewFlatPost(createFlatPostDto: FlatPostDto, userId: string): Promise<FlatPost> {
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
    for (let i = 0; i < createFlatPostDto.preferredUniversityIds.length; i++) {
      let preferredUniversityId = createFlatPostDto.preferredUniversityIds[i];
      await this.prisma.flatPostOnUniversityPreferred.create({
        data: {
          flatPost: { connect: { id: flatPosts.id } },
          university: { connect: { id: Number(preferredUniversityId) } }
        }
      });
    }
    for (let i = 0; i < createFlatPostDto.undesirableUniversityIds.length; i++) {
      let undesirableUniversityId = createFlatPostDto.undesirableUniversityIds[i];
      await this.prisma.flatPostOnUniversityUndesirable.create({
        data: {
          flatPost: { connect: { id: flatPosts.id } },
          university: { connect: { id: Number(undesirableUniversityId) } }
        }
      });
    }
    return flatPosts;
  }

  async findFlatPostById(flatId: number, userId: string): Promise<FlatPost> {
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

  async changeFlatPost(flatPostDto: FlatPostDto, flatId: number, userId: string): Promise<FlatPost> {
    const flatPost = await this.findFlatPostById(flatId, userId);
    this.deleteFlatPost(flatId, userId);
    return this.createNewFlatPost(flatPostDto, userId);
  }

  async deleteFlatPost(flatId: number, userId: string): Promise<FlatPost> {
    const flatPost = await this.findFlatPostById(flatId, userId);
    return this.prisma.flatPost.delete({
      where: {
        id: flatId
      }
    });
  }
}
