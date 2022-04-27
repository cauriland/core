import { Application, Container, Contracts, Utils as AppUtils } from "@cauriland/core-kernel";
import { Managers, Utils } from "@cauriland/crypto";
import { ServiceProvider } from "@packages/core-api/src";
import { Sandbox } from "@packages/core-test-framework/src";
import { EventEmitter } from "events";
import { resolve } from "path";

EventEmitter.prototype.constructor = Object.prototype.constructor;

const sandbox: Sandbox = new Sandbox();

export const setUp = async (): Promise<Application> => {
    jest.setTimeout(60000);

    process.env.DISABLE_P2P_SERVER = "true"; // no need for p2p socket server to run
    process.env.CORE_RESET_DATABASE = "1";

    sandbox.withCoreOptions({
        flags: {
            token: "cauri",
            network: "unitnet",
            env: "test",
        },
        peers: {
            list: [{ ip: "127.0.0.1", port: 4300 }], // need some peers defined for the app to run
        },
    });

    await sandbox
        .withCoreOptions({
            app: {
                core: {
                    plugins: [
                        { package: "@cauriland/core-state" },
                        { package: "@cauriland/core-database" },
                        { package: "@cauriland/core-transactions" },
                        { package: "@cauriland/core-magistrate-transactions" },
                        { package: "@cauriland/core-transaction-pool" },
                        { package: "@cauriland/core-p2p" },
                        { package: "@cauriland/core-blockchain" },
                        { package: "@cauriland/core-forger" },
                    ],
                },
                relay: {
                    plugins: [
                        { package: "@cauriland/core-state" },
                        { package: "@cauriland/core-database" },
                        { package: "@cauriland/core-transactions" },
                        { package: "@cauriland/core-transaction-pool" },
                        { package: "@cauriland/core-p2p" },
                        { package: "@cauriland/core-blockchain" },
                    ],
                },
                forger: {
                    plugins: [{ package: "@cauriland/core-forger" }],
                },
            },
        })
        .boot(async ({ app }) => {
            await app.bootstrap({
                flags: {
                    token: "cauri",
                    network: "unitnet",
                    env: "test",
                    processType: "core",
                },
            });

            // We need to manually register the service provider from source so that jest can collect coverage.
            sandbox.registerServiceProvider({
                name: "@cauriland/core-api",
                path: resolve(__dirname, "../../../../packages/core-api"),
                klass: ServiceProvider,
            });

            Managers.configManager.getMilestone().aip11 = false;
            Managers.configManager.getMilestone().htlcEnabled = false;

            await app.boot();

            Managers.configManager.getMilestone().aip11 = true;
            Managers.configManager.getMilestone().htlcEnabled = true;

            await AppUtils.sleep(1000); // give some more time for api server to be up
        });

    return sandbox.app;
};

export const tearDown = async (): Promise<void> => {
    await sandbox.dispose();
};

export const calculateRanks = async () => {
    const walletRepository = sandbox.app.getTagged<Contracts.State.WalletRepository>(
        Container.Identifiers.WalletRepository,
        "state",
        "blockchain",
    );

    const delegateWallets = Object.values(
        walletRepository.allByUsername(),
    ).sort((a: Contracts.State.Wallet, b: Contracts.State.Wallet) =>
        b
            .getAttribute<Utils.BigNumber>("delegate.voteBalance")
            .comparedTo(a.getAttribute<Utils.BigNumber>("delegate.voteBalance")),
    );

    AppUtils.sortBy(delegateWallets, (wallet) => wallet.getPublicKey()).forEach((delegate, i) => {
        const wallet = walletRepository.findByPublicKey(delegate.getPublicKey()!);
        wallet.setAttribute("delegate.rank", i + 1);

        walletRepository.index(wallet);
    });
};
