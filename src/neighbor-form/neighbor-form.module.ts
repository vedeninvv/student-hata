import { Module } from '@nestjs/common';
import { NeighborFormController } from './neighbor-form.controller';
import { NeighborFormService } from './neighbor-form.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [NeighborFormController],
  providers: [NeighborFormService]
})
export class NeighborFormModule {}
