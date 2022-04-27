import { Identifiers as ApiIdentifiers, Server } from "@cauriland/core-api";
import { Application, Utils as AppUtils } from "@cauriland/core-kernel";
import { Managers } from "@cauriland/crypto";
import Hapi from "@hapi/hapi";
import { Sandbox } from "@packages/core-test-framework/src";
import { EventEmitter } from "events";

import { EchoController } from "./echo-controller";

EventEmitter.prototype.constructor = Object.prototype.constructor;

const sandbox: Sandbox = new Sandbox();

const registerEchoApi = (app: Application) => {
    const controller = app.resolve(EchoController);
    const apiServer = app.get<Server>(ApiIdentifiers.HTTP);

    apiServer.register({
        plugin: {
            name: "Echo API",
            version: "1.0.0",
            register(hapiServer: Hapi.Server): void {
                hapiServer.bind(controller);

                hapiServer.route({
                    method: "GET",
                    path: "/echo",
                    handler: controller.index,
                });

                hapiServer.route({
                    method: "POST",
                    path: "/echo",
                    handler: controller.index,
                });
            },
        },
        routes: { prefix: "/api" },
    });
};

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
                        { package: "@cauriland/core-api" },
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
                        { package: "@cauriland/core-api" },
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

            Managers.configManager.getMilestone().aip11 = false;
            Managers.configManager.getMilestone().htlcEnabled = false;

            await app.boot();
            registerEchoApi(app);

            Managers.configManager.getMilestone().aip11 = true;
            Managers.configManager.getMilestone().htlcEnabled = true;

            await AppUtils.sleep(1000); // give some more time for api server to be up
        });

    return sandbox.app;
};

export const tearDown = async (): Promise<void> => {
    await sandbox.dispose();
};
