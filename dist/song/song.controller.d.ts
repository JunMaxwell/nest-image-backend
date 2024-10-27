import { SongService } from './song.service';
export declare class SongController {
    private readonly songService;
    constructor(songService: SongService);
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
}
