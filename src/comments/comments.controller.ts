import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Prisma, Comment } from '@prisma/client';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() commentData: Prisma.CommentCreateInput,
  ): Promise<Comment> {
    return this.commentsService.create(commentData);
  }

  @Get('image/:id')
  async findByImage(@Param('id') id: string) {
    return this.commentsService.findByImage(+id);
  }
}
