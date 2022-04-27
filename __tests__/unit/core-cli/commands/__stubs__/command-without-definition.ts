import { Commands, Container } from "@cauriland/core-cli";

@Container.injectable()
export class CommandWithoutDefinition extends Commands.Command {
    public signature: string = "config:cli";
    public description: string = "Update the CLI configuration.";

    public async execute(): Promise<void> {
        // Do nothing...
    }
}
