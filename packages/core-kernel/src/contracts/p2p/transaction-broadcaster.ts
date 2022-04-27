import { Interfaces } from "@cauriland/crypto";

export interface TransactionBroadcaster {
    broadcastTransactions(transactions: Interfaces.ITransaction[]): Promise<void>;
}
