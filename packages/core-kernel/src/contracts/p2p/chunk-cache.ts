import { Interfaces } from "@cauriland/crypto";

export interface ChunkCache {
    has(key: string): boolean;
    get(key: string): Interfaces.IBlockData[];
    set(key: string, data: Interfaces.IBlockData[]): void;
    remove(key: string): void;
}
