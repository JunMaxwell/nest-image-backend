import { Injectable } from '@nestjs/common';
import { Image, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ImageCreateInput): Promise<Image> {
    return this.prisma.image.create({ data });
  }

  async findAll(): Promise<Image[]> {
    return this.prisma.image.findMany();
  }

  async findOne(id: number): Promise<Image | null> {
    return this.prisma.image.findUnique({ where: { id } });
  }
}
