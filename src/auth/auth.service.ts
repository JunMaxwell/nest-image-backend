import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      console.log('Validating user', result);
      return result;
    }
    console.log('User not found');
    return null;
  }

  async login(user: User) {
    if (!user || !user.email || !user.id) {
      throw new BadRequestException('Invalid user data');
    }

    try {
      const payload = { email: user.email, sub: user.id };
      return {
        ...user,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new Error('An error occurred while generating the access token');
    }
  }

  async register(email: string, password: string, name?: string): Promise<any> {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error('An error occurred while registering the user');
    }
  }
}
