import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  async uploadImage(file: Express.Multer.File, userId: number) {
    const filename = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Ensure the uploads directory exists
    if (!fs.existsSync(path.join(process.cwd(), 'uploads'))) {
      fs.mkdirSync(path.join(process.cwd(), 'uploads'));
    }

    // Write the file
    fs.writeFileSync(filePath, file.buffer);

    console.log('UserId', userId);

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }
    // Save image info to database
    const image = await this.prisma.image.create({
      data: {
        filename,
        url: `/uploads/${filename}`,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return image;
  }
}
