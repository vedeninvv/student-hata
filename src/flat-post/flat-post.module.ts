import { Module } from '@nestjs/common';
import { FlatPostController } from './flat-post.controller';
import { FlatPostService } from './flat-post.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [FlatPostController],
  providers: [FlatPostService]
})
export class FlatPostModule {}
