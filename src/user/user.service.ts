import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangeAccountDto } from "./dto/change-account.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Account, User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async changePassword(changePasswordDto: ChangePasswordDto, userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.password === changePasswordDto.oldPassword) {
      return await this.prisma.user.update({
        where: { id: userId },
        data: { password: changePasswordDto.newPassword }
      });
    }
    throw new HttpException("Passwords are not same", HttpStatus.BAD_REQUEST);
  }

  async changeEmail(changeEmailDto: ChangeEmailDto, userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return this.prisma.user.update({
      where: { id: userId },
      data: { email: changeEmailDto.newEmail }
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        account: {
          create: {}
        }
      }
    });
  }

  async changeAccountInfo(changeAccountDto: ChangeAccountDto, userId: number): Promise<Account> {
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

  async getAccountByUserId(userId: number): Promise<Account> {
    return this.prisma.account.findUnique({ where: { userId: userId } });
  }
}
