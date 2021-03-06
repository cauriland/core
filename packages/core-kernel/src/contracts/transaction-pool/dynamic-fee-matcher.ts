import { Interfaces } from "@cauriland/crypto";

export interface DynamicFeeMatcher {
    throwIfCannotEnterPool(transaction: Interfaces.ITransaction): Promise<void>;
    throwIfCannotBroadcast(transaction: Interfaces.ITransaction): Promise<void>;
}
