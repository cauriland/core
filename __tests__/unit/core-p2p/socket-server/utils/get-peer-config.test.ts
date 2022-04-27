import { Container } from "@cauriland/core-kernel";
import { getPeerConfig } from "@cauriland/core-p2p/src/socket-server/utils/get-peer-config";
import { Managers } from "@cauriland/crypto";

let mockConfig;
let version;
let appPlugins;
let coreApiServiceProviderConfiguration;
let coreApiServiceProvider;
let coreWebhooksServiceProvider;
let coreP2PServiceProvider;
let serviceProviders;
let app;
let result;

beforeEach(() => {
    mockConfig = {
        "network.pubKeyHash": "pubkyhash",
        "network.name": "thechain",
        "network.nethash": "nethahs",
        "network.client.explorer": "explorer.thechain.com",
        "network.client.token": "TCHAIN",
        "network.client.symbol": "TCH",
    };
    jest.spyOn(Managers.configManager, "get").mockImplementation((key) => mockConfig[key]);

    version = "3.0.9";
    appPlugins = [
        { package: "@cauriland/core-api", options: {} },
        { package: "@cauriland/core-webhooks" },
        { package: "@cauriland/core-p2p" },
    ];

    coreApiServiceProvider = {
        name: () => "core-api",
        config: () => ({
            all: () => coreApiServiceProviderConfiguration,
        }),
    };
    coreWebhooksServiceProvider = {
        name: () => "core-webhooks",
        config: () => ({
            all: () => ({
                enabled: true,
                server: {
                    http: {
                        port: 4304,
                    },
                },
            }),
        }),
    };
    coreP2PServiceProvider = {
        name: () => "core-p2p",
        config: () => ({
            all: () => ({}),
        }),
    };
    serviceProviders = {
        "@cauriland/core-api": coreApiServiceProvider,
        "@cauriland/core-webhooks": coreWebhooksServiceProvider,
        "@cauriland/core-p2p": coreP2PServiceProvider,
    };
    const configRepository = { get: () => appPlugins }; // get("app.plugins")
    const serviceProviderRepository = { get: (plugin) => serviceProviders[plugin] };
    const appGet = {
        [Container.Identifiers.ConfigRepository]: configRepository,
        [Container.Identifiers.ServiceProviderRepository]: serviceProviderRepository,
    };

    app = {
        version: () => version,
        get: (key) => appGet[key],
    };

    result = {
        version,
        network: {
            version: mockConfig["network.pubKeyHash"],
            name: mockConfig["network.name"],
            nethash: mockConfig["network.nethash"],
            explorer: mockConfig["network.client.explorer"],
            token: {
                name: mockConfig["network.client.token"],
                symbol: mockConfig["network.client.symbol"],
            },
        },
        plugins: {
            "@cauriland/core-api": {
                enabled: true,
                estimateTotalCount: true,
                port: 4303,
            },
            "@cauriland/core-webhooks": {
                enabled: true,
                port: 4304,
            },
        },
    };
});

describe("getPeerConfig", () => {
    it("should omit a plugin if it is storing the [port] at the root of the options", () => {
        coreApiServiceProviderConfiguration = {
            enabled: true,
            port: 4303,
        };

        delete result.plugins["@cauriland/core-api"];
        expect(getPeerConfig(app)).toEqual(result);
    });

    it("should omit a plugin if it is storing the [port] in the [options] key", () => {
        coreApiServiceProviderConfiguration = {
            enabled: true,
            options: {
                port: 4303,
            },
        };

        delete result.plugins["@cauriland/core-api"];
        expect(getPeerConfig(app)).toEqual(result);
    });

    it("should omit a plugin if it is storing the [port] in the [server] object", () => {
        coreApiServiceProviderConfiguration = {
            enabled: true,
            server: {
                port: 4303,
            },
        };

        delete result.plugins["@cauriland/core-api"];
        expect(getPeerConfig(app)).toEqual(result);
    });

    it("should accept a plugin if it is storing the [port] in the [server.http] object", () => {
        coreApiServiceProviderConfiguration = {
            enabled: true,
            server: {
                http: {
                    port: 4303,
                }
            },
            options: {
                estimateTotalCount: true
            }
        };

        expect(getPeerConfig(app)).toEqual(result);
    });

    it("should accept a plugin if it is storing the [port] in the [server.https] object", () => {
        coreApiServiceProviderConfiguration = {
            enabled: true,
            server: {
                https: {
                    port: 4303,
                }
            },
            options: {
                estimateTotalCount: true
            }
        };

        expect(getPeerConfig(app)).toEqual(result);
    });

    it("should return plugins enabled value if enabled property is listed in configuration", () => {
        coreApiServiceProviderConfiguration = {
            enabled: false,
            server: {
                http: {
                    port: 4303,
                }
            },
            options: {
                estimateTotalCount: true
            }
        };

        result.plugins["@cauriland/core-api"].enabled = false;
        expect(getPeerConfig(app)).toEqual(result);
    });
});
