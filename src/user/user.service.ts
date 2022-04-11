import { Injectable, NotImplementedException } from "@nestjs/common";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangeAccountDto } from "./dto/change-account.dto";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async changePassword(changePasswordDto: ChangePasswordDto, userId: number) {
    throw new NotImplementedException();
  }

  async changeEmail(changeEmailDto: ChangeEmailDto, userId: number) {
    throw new NotImplementedException();
  }

   async createUser(createUserDto: CreateUserDto): Promise<User> {
     let user = await this.prisma.user.create({
       data: {
         email: createUserDto.email,
         password: createUserDto.password
       }
     });
     this.prisma.account.create({
       data: {
         name: "",
         surname: "",
         genderId: 0,
         contactEmail: "",
         phone: "",
         userId: user.id
       }
     })
   }

  async changeAccountInfo(changeAccountDto: ChangeAccountDto, userId: number) {
    throw new NotImplementedException();
  }

  async getAccountById(userId: number) {
    return this.prisma.account.findUnique({ where: { userId } });
  }
}
