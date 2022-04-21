import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [UniversityService],
  exports: [UniversityService]
})
export class UniversityModule {}