import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [ImagesService, PrismaService, UsersService],
  controllers: [ImagesController],
})
export class ImagesModule {}
