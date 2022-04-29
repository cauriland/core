import { BIP39 } from "@packages/core-forger/src/methods/bip39";
import { TransactionFactory } from "@packages/core-test-framework/src/utils/transaction-factory";
import { Utils } from "@packages/crypto";

export const dummy = {
    plainPassphrase: "clay harbor enemy utility margin pretty hub comic piece aerobic umbrella acquire",
    bip38Passphrase: "6PYTQC4c2vBv6PGvV4HibNni6wNsHsGbR1qpL1DfkCNihsiWwXnjvJMU4B",
    publicKey: "032516d62b876c5e0d599f8923b90b81c9894419cd35874d62945e0cdb007f22e5",
    address: "CNBkoGqWeTSiaEVgVzSKZd3jS7UWzv9PSo",
};

export const expectedBlock = {
    version: 0,
    timestamp: 12345689,
    height: 3,
    previousBlockHex: "0000000000a98ac7",
    previousBlock: "11111111",
    numberOfTransactions: 50,
    totalAmount: Utils.BigNumber.make(500),
    totalFee: Utils.BigNumber.make(500000000),
    reward: Utils.BigNumber.make(0),
    payloadLength: 1600,
    generatorPublicKey: "032516d62b876c5e0d599f8923b90b81c9894419cd35874d62945e0cdb007f22e5",
};

export const optionsDefault = {
    timestamp: 12345689,
    previousBlock: {
        id: "11111111",
        idHex: "11111111",
        height: 2,
    },
    reward: Utils.BigNumber.make(0),
};

export const transactions = TransactionFactory.initialize()
    .transfer("DB4gFuDztmdGALMb8i1U4Z4R5SktxpNTAY", 10)
    .withNetwork("devnet")
    .withPassphrase("super cool passphrase")
    .create(50);

export const delegate: BIP39 = new BIP39(dummy.plainPassphrase);

export const forgedBlockWithTransactions = delegate.forge(transactions, optionsDefault);
