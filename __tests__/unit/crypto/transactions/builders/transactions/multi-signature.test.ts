import "jest-extended";

import { Generators } from "@packages/core-test-framework/src";
import { TransactionType } from "@packages/crypto/src/enums";
import { TransactionVersionError } from "@packages/crypto/src/errors";
import { configManager } from "@packages/crypto/src/managers";
import { BuilderFactory } from "@packages/crypto/src/transactions";
import { MultiSignatureBuilder } from "@packages/crypto/src/transactions/builders/transactions/multi-signature";
import { Two } from "@packages/crypto/src/transactions/types";
import * as Utils from "@packages/crypto/src/utils";

let builder: MultiSignatureBuilder;

beforeEach(() => {
    // todo: completely wrap this into a function to hide the generation and setting of the config?
    const config = Generators.generateCryptoConfigRaw();
    configManager.setConfig(config);

    builder = BuilderFactory.multiSignature();
});

describe("Multi Signature Transaction", () => {
    describe("verify", () => {
        it("should be valid with a signature", () => {
            const actual = builder
                .multiSignatureAsset({
                    publicKeys: [
                        "039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
                        "028d3611c4f32feca3e6713992ae9387e18a0e01954046511878fe078703324dc0",
                        "021d3932ab673230486d0f956d05b9e88791ee298d9af2d6df7d9ed5bb861c92dd",
                    ],
                    min: 2,
                })
                .senderPublicKey("039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22")
                .multiSign("secret 1", 0)
                .multiSign("secret 2", 1)
                .multiSign("secret 3", 2)
                .sign("secret 1");

            expect(actual.build().verified).toBeTrue();
            expect(actual.verify()).toBeTrue();
        });

        it("should be invalid when aip11 is not active", () => {
            configManager.getMilestone().aip11 = false;
            const actual = builder
                .multiSignatureAsset({
                    publicKeys: [
                        "039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
                        "028d3611c4f32feca3e6713992ae9387e18a0e01954046511878fe078703324dc0",
                        "021d3932ab673230486d0f956d05b9e88791ee298d9af2d6df7d9ed5bb861c92dd",
                    ],
                    min: 2,
                })
                .senderPublicKey("039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22");

            expect(() => actual.multiSign("secret 1", 0)).toThrowError(TransactionVersionError);
            configManager.getMilestone().aip11 = true;
        });
    });

    it("should have its specific properties", () => {
        expect(builder).toHaveProperty("data.type", TransactionType.MultiSignature);
        expect(builder).toHaveProperty("data.version", 0x02);
        expect(builder).toHaveProperty("data.fee", Utils.BigNumber.make(0));
        expect(builder).toHaveProperty("data.amount", Utils.BigNumber.make(0));
        expect(builder).toHaveProperty("data.recipientId", undefined);
        expect(builder).toHaveProperty("data.senderPublicKey", undefined);
        expect(builder).toHaveProperty("data.asset");
        expect(builder).toHaveProperty("data.asset.multiSignature", { min: 0, publicKeys: [] });
    });

    describe("multiSignatureAsset", () => {
        const multiSignatureFee = Two.MultiSignatureRegistrationTransaction.staticFee();
        const multiSignature = {
            publicKeys: ["key a", "key b", "key c"],
            min: 1,
        };

        it("establishes the multi-signature on the asset", () => {
            builder.multiSignatureAsset(multiSignature);
            expect(builder.data.asset.multiSignature).toBe(multiSignature);
        });

        it("calculates and establish the fee", () => {
            builder.multiSignatureAsset(multiSignature);
            expect(builder.data.fee).toEqual(Utils.BigNumber.make(4).times(multiSignatureFee));
        });
    });

    describe("multiSign", () => {
        it("adds the signature to the transaction", () => {
            const actual = builder
                .multiSignatureAsset({
                    publicKeys: [
                        "039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
                        "028d3611c4f32feca3e6713992ae9387e18a0e01954046511878fe078703324dc0",
                        "021d3932ab673230486d0f956d05b9e88791ee298d9af2d6df7d9ed5bb861c92dd",
                    ],
                    min: 2,
                })
                .senderPublicKey("039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22")
                .nonce("1");

            actual.multiSign("secret 1", 0).multiSign("secret 2", 1).multiSign("secret 3", 2);

            expect(actual.data.signatures).toEqual([
                "00b744e31cd47500530938647d7e26d616cb2140efaade3386abecb86c64057a03ba209e009dae970b18e7844696a7dbdd77096c8cc95c7095a950caf230a1a2c9",
                "01cf422cc0217334e68ceaadd8af7bab82fe9020a629d4f0f833791a500976ed91161ace8d1c67d3406850960d1e1b41a55a151d514d06bf37e1d65ad4fa438b25",
                "0285820c1948f2f688ffdc649f7523410903a8917366aaabe8836b49f6970cb4f3fe3c1cc228472f9dbd1b37d103bd21258d96ddc0a91ae106a69cf648d57a7fb2",
            ]);
            expect(actual.data.signatures.length).toBe(3);
        });
    });
});
