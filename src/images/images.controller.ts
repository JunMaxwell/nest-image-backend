import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Image, Prisma } from '@prisma/client';
@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() imageData: Prisma.ImageCreateInput): Promise<Image> {
    return this.imagesService.create(imageData);
  }

  @Get()
  async findAll(): Promise<Image[]> {
    return this.imagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Image | null> {
    return this.imagesService.findOne(+id);
  }
}
