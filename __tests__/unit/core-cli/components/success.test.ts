import { Container } from "@cauriland/core-cli";
import { Console } from "@cauriland/core-test-framework";
import { Success } from "@packages/core-cli/src/components";
import { white } from "kleur";

let cli;
let component;

beforeEach(() => {
    cli = new Console();

    // Bind from src instead of dist to collect coverage.
    cli.app.rebind(Container.Identifiers.Success).to(Success).inSingletonScope();
    component = cli.app.get(Container.Identifiers.Success);
});

describe("Success", () => {
    it("should render the component", () => {
        const spyLogger = jest.spyOn(cli.app.get(Container.Identifiers.Logger), "info");

        component.render("Hello World");

        expect(spyLogger).toHaveBeenCalledWith(white().bgGreen(`[OK] Hello World`));
    });
});
