import { Interfaces } from "@cauriland/crypto";

export interface Collator {
    getBlockCandidateTransactions(): Promise<Interfaces.ITransaction[]>;
}
