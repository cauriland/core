import { Interfaces } from "@cauriland/crypto";

export interface DownloadBlock extends Omit<Interfaces.IBlockData, "transactions"> {
    transactions: string[];
}
