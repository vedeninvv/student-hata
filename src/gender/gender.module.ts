import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [GenderService],
  exports: [GenderService]
})
export class GenderModule {}
