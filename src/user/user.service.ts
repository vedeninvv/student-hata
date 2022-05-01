import { Injectable } from "@nestjs/common";
import { ChangeAccountDto } from "./dto/change-account.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Account, User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async createUser(email: string, userId: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: email,
        id: userId,
        account: {
          create: {
            name: "User"
          }
        }
      }
    });
  }

  async changeAccountInfo(changeAccountDto: ChangeAccountDto, userId: string): Promise<Account> {
    return this.prisma.account.update({
      where: { userId: userId },
      data: {
        name: changeAccountDto.name,
        surname: changeAccountDto.surname,
        genderId: changeAccountDto.genderId,
        contactEmail: changeAccountDto.contactEmail,
        phone: changeAccountDto.phone,
        filled: true
      }
    });
  }

  async getAccountByUserId(userId: string): Promise<Account> {
    return this.prisma.account.findUnique({ where: { userId: userId } });
  }
}
