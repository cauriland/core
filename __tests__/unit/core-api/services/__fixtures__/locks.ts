import { Utils as AppUtils } from "@packages/core-kernel";
import { Enums } from "@packages/crypto";

export const walletLockAttributes = {
    "8816f8d8c257ea0c951deba911266394b0f2614df023f8b4ffd9da43d36efd9d": {
        amount: AppUtils.BigNumber.ONE,
        recipientId: "02275d8577a0ec2b75fc8683282d53c5db76ebc54514a80c2854e419b793ea259a",
        timestamp: 111180032,
        vendorField: undefined,
        expiration: {
            type: Enums.HtlcLockExpirationType.EpochTimestamp,
            value: 1111800392,
        },
        secretHash: "secretHash",
    },
};

export const lockResource = {
    amount: AppUtils.BigNumber.ONE,
    expirationType: 1,
    expirationValue: 1111800392,
    isExpired: false,
    lockId: "8816f8d8c257ea0c951deba911266394b0f2614df023f8b4ffd9da43d36efd9d",
    recipientId: "02275d8577a0ec2b75fc8683282d53c5db76ebc54514a80c2854e419b793ea259a",
    secretHash: "secretHash",
    senderPublicKey: "032516d62b876c5e0d599f8923b90b81c9894419cd35874d62945e0cdb007f22e5",
    timestamp: {
        epoch: 111180032,
        human: "2025-10-14T19:53:31.820Z",
        unix: 1760471611,
    },
    vendorField: undefined,
};
