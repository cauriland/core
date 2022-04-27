import { Container, Contracts } from "@cauriland/core-kernel";
import { Handlers } from "@cauriland/core-transactions";
import { Interfaces, Transactions } from "@cauriland/crypto";
import { strictEqual } from "assert";

@Container.injectable()
export class TransactionValidator implements Contracts.State.TransactionValidator {
    @Container.inject(Container.Identifiers.TransactionHandlerRegistry)
    @Container.tagged("state", "clone")
    private readonly handlerRegistry!: Handlers.Registry;

    public async validate(transaction: Interfaces.ITransaction): Promise<void> {
        const deserialized: Interfaces.ITransaction = Transactions.TransactionFactory.fromBytes(transaction.serialized);
        strictEqual(transaction.id, deserialized.id);
        const handler = await this.handlerRegistry.getActivatedHandlerForData(transaction.data);
        await handler.apply(transaction);
    }
}
