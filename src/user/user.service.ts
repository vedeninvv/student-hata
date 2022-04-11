import { Injectable, NotImplementedException } from "@nestjs/common";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangeAccountDto } from "./dto/change-account.dto";
import { PrismaService } from "../prisma/prisma.service";
import { User, Account } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async changePassword(changePasswordDto: ChangePasswordDto, userId: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id: Number(userId) } });
    if (user.password === changePasswordDto.oldPassword) {
      await this.prisma.user.update({
        where: { id: Number(userId) },
        data: { password: changePasswordDto.newPassword }
      });
      return true;
    }
    return false;
  }

  async changeEmail(changeEmailDto: ChangeEmailDto, userId) {
    const user = await this.prisma.user.findUnique({ where: { id: Number(userId) } });
    return this.prisma.user.update({
      where: { id: Number(userId)},
      data: { email: changeEmailDto.newEmail}
    })
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password
      }
    });
    await this.prisma.account.create({
      data: {
        name: "test",
        userId: user.id
      }
    });
    return user;
  }

  async changeAccountInfo(changeAccountDto: ChangeAccountDto, userId): Promise<Account> {
    return this.prisma.account.update({
      where: { userId: Number(userId) },
      data: {
        name: changeAccountDto.name,
        surname: changeAccountDto.surname,
        genderId: changeAccountDto.genderId,
        contactEmail: changeAccountDto.contactEmail,
        phone: changeAccountDto.phone
      }
    })
  }

  async getAccountByUserId(userId: number): Promise<Account> {
    return this.prisma.account.findUnique({ where: { userId: Number(userId) } });
  }
}
