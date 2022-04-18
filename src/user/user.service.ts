import { Injectable, NotImplementedException } from "@nestjs/common";
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
    throw new NotImplementedException();
  }

  async changeEmail(changeEmailDto: ChangeEmailDto, userId: number): Promise<User> {
    throw new NotImplementedException();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    throw new NotImplementedException();
  }

  async changeAccountInfo(changeAccountDto: ChangeAccountDto, userId: number): Promise<Account> {
    throw new NotImplementedException();
  }

  async getAccountByUserId(userId: number): Promise<Account> {
    throw new NotImplementedException();
  }
}
