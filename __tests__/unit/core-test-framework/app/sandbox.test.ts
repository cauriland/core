import "jest-extended";

import { Container } from "@packages/core-kernel";
import { ServiceProvider as CoreStateServiceProvider } from "@packages/core-state";
import { CoreOptions, CryptoOptions, Sandbox } from "@packages/core-test-framework/src/app";
import { resolve } from "path";

describe("Sandbox", () => {
    it("should create app", async () => {
        const sandbox = new Sandbox();

        expect(sandbox.app).toBeDefined();
    });

    it("should boot", async () => {
        const sandbox = new Sandbox();

        const callback = jest.fn();

        await expect(sandbox.boot(callback)).toResolve();
        expect(callback).toHaveBeenCalled();
    });

    it("should boot with core options", async () => {
        const sandbox = new Sandbox();

        const callback = jest.fn();

        const coreOptions: CoreOptions = {
            flags: {
                network: "dummynet",
                token: "DCAU",
            },
        };

        await expect(sandbox.withCoreOptions(coreOptions).boot(callback)).toResolve();
        expect(callback).toHaveBeenCalled();
    });

    it("should boot with crypto options", async () => {
        const sandbox = new Sandbox();

        const callback = jest.fn();

        const coreOptions: CryptoOptions = {
            flags: {
                network: "dummynet",
                premine: "15300000000000000",
                delegates: 101,
                blocktime: 8,
                maxTxPerBlock: 160,
                maxBlockPayload: 6720000,
                rewardHeight: 324000,
                rewardAmount: 150000000,
                pubKeyHash: 28,
                wif: 16,
                token: "DCAU",
                symbol: "Dꚦ",
                explorer: "http://dexplorer.cauri.cm",
                distribute: true,
            },
        };

        await expect(sandbox.withCryptoOptions(coreOptions).boot(callback)).toResolve();
        expect(callback).toHaveBeenCalled();
    });

    it("should dispose", async () => {
        const sandbox = new Sandbox();

        await expect(sandbox.boot()).toResolve();
        await expect(sandbox.dispose()).toResolve();
    });

    it("should dispose with callback", async () => {
        const sandbox = new Sandbox();

        const callback = jest.fn();

        await expect(sandbox.boot()).toResolve();
        await expect(sandbox.dispose(callback)).toResolve();
        expect(callback).toHaveBeenCalled();
    });

    it("should restore", async () => {
        const sandbox = new Sandbox();

        sandbox.snapshot();

        const testBinding = "test";

        sandbox.app.bind("test").toConstantValue(testBinding);

        expect(sandbox.app.get("test")).toBe(testBinding);

        sandbox.restore();

        expect(() => {
            sandbox.app.get("test");
        }).toThrowError();
    });

    it("should register service provider", async () => {
        const sandbox = new Sandbox();

        sandbox.app.bind(Container.Identifiers.EventDispatcherService).toConstantValue({});

        const serviceProviderOptions = {
            name: "@cauriland/core-state",
            path: resolve(__dirname, "../../../../packages/core-state"),
            klass: CoreStateServiceProvider,
        };

        expect(sandbox.registerServiceProvider(serviceProviderOptions)).toBe(sandbox);
    });
});
