import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({ data });
  }

  async findByImage(imageId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: { imageId },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }
}
