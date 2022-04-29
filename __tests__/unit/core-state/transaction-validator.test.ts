import "jest-extended";

import { Utils } from "@packages/core-kernel/src";
import { TransactionValidator } from "@packages/core-state/src/transaction-validator";
import { AssertionError } from "assert";

import { makeVoteTransactions } from "./__utils__/make-vote-transactions";
import { setUp } from "./setup";

let transactionValidator: TransactionValidator;
let applySpy: jest.SpyInstance;

beforeAll(async () => {
    const initialEnv = await setUp();
    transactionValidator = initialEnv.transactionValidator;
    applySpy = initialEnv.spies.applySpy;
});

afterAll(() => jest.clearAllMocks());

describe("Transaction Validator", () => {
    it("should validate transactions", async () => {
        const transaction = makeVoteTransactions(1, [
            `+${"032516d62b876c5e0d599f8923b90b81c9894419cd35874d62945e0cdb007f22e5"}`,
        ]);

        await transactionValidator.validate(transaction[0]);

        expect(applySpy).toHaveBeenCalledWith(transaction[0]);
    });

    it("should throw when transaction id doesn't match deserialised", () => {
        const transaction = makeVoteTransactions(1, [
            `+${"032516d62b876c5e0d599f8923b90b81c9894419cd35874d62945e0cdb007f22e5"}`,
        ]);
        const copiedTransaction = Utils.cloneObject(transaction[0]) as any;
        copiedTransaction.id = "wrong";

        expect.assertions(1);
        transactionValidator.validate(copiedTransaction).catch((e) => expect(e).toBeInstanceOf(AssertionError));
    });
});
