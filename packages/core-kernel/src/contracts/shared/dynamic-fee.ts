import { Interfaces } from "@cauriland/crypto";

export interface DynamicFeeContext {
    transaction: Interfaces.ITransaction;
    addonBytes: number;
    satoshiPerByte: number;
    height: number;
}
