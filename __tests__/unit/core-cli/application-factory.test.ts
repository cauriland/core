import { Application, ApplicationFactory, Container, Utils } from "@packages/core-cli/src";

describe("ApplicationFactory", () => {
    it("should create an application instance with the given container", () => {
        expect(
            ApplicationFactory.make(new Container.Container(), {
                name: "@cauriland/core",
                description: "Core of the Cauri Blockchain",
                version: "3.0.0-next.0",
            }),
        ).toBeInstanceOf(Application);
    });

    it("should expose the ProcessFactory", () => {
        const app = ApplicationFactory.make(new Container.Container(), {
            name: "@cauriland/core",
            description: "Core of the Cauri Blockchain",
            version: "3.0.0-next.0",
        });

        expect(app.get<any>(Container.Identifiers.ProcessFactory)("cauri", "core")).toBeInstanceOf(Utils.Process);
    });
});
