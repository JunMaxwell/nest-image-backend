import { PrismaService } from 'src/prisma.service';
export declare class SongService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    findAll2(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
}
