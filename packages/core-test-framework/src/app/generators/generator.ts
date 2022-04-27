import { Identities, Interfaces } from "@cauriland/crypto";
import { generateMnemonic } from "bip39";

import passphrases from "../../internal/passphrases.json";
import { SandboxOptions, Wallet } from "../contracts";

/**
 * @export
 * @class Generator
 */
export abstract class Generator {
    /**
     * @private
     * @type {ConfigPaths}
     * @memberof Sandbox
     */
    protected options: SandboxOptions = {
        core: {},
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
        },
    };

    /**
     * @param {SandboxOptions} options
     * @memberof Generator
     */
    public constructor(options?: SandboxOptions) {
        if (options) {
            this.options = { ...this.options, ...options };
        }
    }

    /**
     * @protected
     * @param {number} activeDelegates
     * @param {number} pubKeyHash
     * @returns {Wallet[]}
     * @memberof Generator
     */
    protected generateCoreDelegates(activeDelegates: number, pubKeyHash: number): Wallet[] {
        const wallets: Wallet[] = [];

        for (let i = 0; i < activeDelegates; i++) {
            const delegateWallet: Wallet = this.createWallet(pubKeyHash, passphrases[i]);
            delegateWallet.username = `genesis_${i + 1}`;

            wallets.push(delegateWallet);
        }

        return wallets;
    }

    /**
     * @protected
     * @param {number} pubKeyHash
     * @param {string} [passphrase]
     * @returns {Wallet}
     * @memberof Generator
     */
    protected createWallet(pubKeyHash: number, passphrase?: string): Wallet {
        if (!passphrase) {
            passphrase = generateMnemonic();
        }

        const keys: Interfaces.IKeyPair = Identities.Keys.fromPassphrase(passphrase);

        return {
            address: Identities.Address.fromPublicKey(keys.publicKey, pubKeyHash),
            passphrase,
            keys,
            username: undefined,
        };
    }
}
