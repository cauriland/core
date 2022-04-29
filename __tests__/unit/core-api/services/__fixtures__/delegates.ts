import { Utils as AppUtils } from "@packages/core-kernel";

export const delegateResource = {
    username: "delegate_username",
    address: "CNBkoGqWeTSiaEVgVzSKZd3jS7UWzv9PSo",
    publicKey: "032516d62b876c5e0d599f8923b90b81c9894419cd35874d62945e0cdb007f22e5",
    votes: AppUtils.BigNumber.ONE,
    rank: 12,
    isResigned: false,
    blocks: {
        produced: AppUtils.BigNumber.ZERO,
        last: undefined,
    },
    production: {
        approval: 0,
    },
    forged: {
        fees: AppUtils.BigNumber.ZERO,
        rewards: AppUtils.BigNumber.ZERO,
        total: AppUtils.BigNumber.ZERO,
    },
};

export const delegateResourceWithLastBlock = {
    username: "delegate_username",
    address: "CNBkoGqWeTSiaEVgVzSKZd3jS7UWzv9PSo",
    publicKey: "032516d62b876c5e0d599f8923b90b81c9894419cd35874d62945e0cdb007f22e5",
    votes: AppUtils.BigNumber.ONE,
    rank: 12,
    isResigned: false,
    blocks: {
        produced: AppUtils.BigNumber.ONE,
        last: {
            id: "17558410102375926929",
            height: AppUtils.BigNumber.make(22),
            timestamp: {
                epoch: 111180032,
                unix: 1760471611,
                human: "2025-10-14T19:53:31.820Z",
            },
        },
    },
    production: {
        approval: 0,
    },
    forged: {
        fees: AppUtils.BigNumber.ZERO,
        rewards: AppUtils.BigNumber.ZERO,
        total: AppUtils.BigNumber.ZERO,
    },
};
