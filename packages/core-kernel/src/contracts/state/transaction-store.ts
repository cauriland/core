import { Interfaces } from "@cauriland/crypto";

import { CappedMap } from "../../utils";

export interface TransactionStore extends CappedMap<string, Interfaces.ITransactionData> {
    push(value: Interfaces.ITransactionData): void;
}
