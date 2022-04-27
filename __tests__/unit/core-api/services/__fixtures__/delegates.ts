import { Utils as AppUtils } from "@packages/core-kernel";

export const delegateResource = {
    username: "delegate_username",
    address: "CNBkoGqWeTSiaEVgVzSKZd3jS7UWzv9PSo",
    publicKey: "03287bfebba4c7881a0509717e71b34b63f31e40021c321f89ae04f84be6d6ac37",
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
    publicKey: "03287bfebba4c7881a0509717e71b34b63f31e40021c321f89ae04f84be6d6ac37",
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
