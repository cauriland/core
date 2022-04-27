import { SandboxOptions } from "@packages/core-test-framework/src/app/contracts";

export const sandboxOptions: SandboxOptions = {
    core: {
        peers: {},
        delegates: {},
        environment: { TEST: "test" },
        app: {},
    },
    crypto: {
        flags: {
            network: "unitnet",
            premine: "15300000000000000",
            delegates: 101,
            blocktime: 8,
            maxTxPerBlock: 150,
            maxBlockPayload: 2097152,
            rewardHeight: 324000,
            rewardAmount: 150000000,
            pubKeyHash: 28,
            wif: 16,
            token: "UCAU",
            symbol: "Uꚦ",
            explorer: "http://uexplorer.cauri.cm",
            distribute: true,
        },
        exceptions: {},
        genesisBlock: {},
        milestones: {},
        network: {},
    },
};
