export const defaults = {
    enabled: !!process.env.CORE_WEBHOOKS_ENABLED,
    server: {
        http: {
            host: process.env.CORE_WEBHOOKS_HOST || "0.0.0.0",
            port: process.env.CORE_WEBHOOKS_PORT || 4304,
        },
        whitelist: ["127.0.0.1", "::ffff:127.0.0.1"],
    },
    timeout: process.env.CORE_WEBHOOKS_TIMEOUT || 1500,
};
