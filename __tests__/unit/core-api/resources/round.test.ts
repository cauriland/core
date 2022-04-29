import "jest-extended";

import { Utils } from "@cauriland/core-kernel";
import { RoundResource } from "@packages/core-api/src/resources";

let resource: RoundResource;

const round = {
    publicKey: "032516d62b876c5e0d599f8923b90b81c9894419cd35874d62945e0cdb007f22e5",
    round: Utils.BigNumber.make("2"),
    balance: Utils.BigNumber.make("245100000000000"),
};

const roundTransformed = {
    publicKey: "032516d62b876c5e0d599f8923b90b81c9894419cd35874d62945e0cdb007f22e5",
    votes: "245100000000000",
};

beforeEach(() => {
    resource = new RoundResource();
});

describe("RoundResource", () => {
    describe("raw", () => {
        it("should return raw object", async () => {
            expect(resource.raw(round)).toEqual(round);
        });
    });

    describe("transformed", () => {
        it("should return transformed object", async () => {
            expect(resource.transform(round)).toEqual(roundTransformed);
        });
    });
});
