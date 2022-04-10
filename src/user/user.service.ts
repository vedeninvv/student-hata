import { Injectable, NotImplementedException } from "@nestjs/common";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangeAccountDto } from "./dto/change-account.dto";

@Injectable()
export class UserService {
  async changePassword(changePasswordDto: ChangePasswordDto, userId: number) {
    throw new NotImplementedException();
  }

  async changeEmail(changeEmailDto: ChangeEmailDto, userId: number) {
    throw new NotImplementedException();
  }

  async createUser(createUserDto: CreateUserDto) {
    throw new NotImplementedException();
  }

  async changeAccountInfo(changeAccountDto: ChangeAccountDto, userId: number) {
    throw new NotImplementedException();
  }

  async getAccountById(userId: number) {
    throw new NotImplementedException();
  }
}
