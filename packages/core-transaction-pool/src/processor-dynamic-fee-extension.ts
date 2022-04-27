import { Container, Contracts } from "@cauriland/core-kernel";
import { Interfaces } from "@cauriland/crypto";

@Container.injectable()
export class ProcessorDynamicFeeExtension extends Contracts.TransactionPool.ProcessorExtension {
    @Container.inject(Container.Identifiers.TransactionPoolDynamicFeeMatcher)
    private readonly dynamicFeeMatcher!: Contracts.TransactionPool.DynamicFeeMatcher;

    public async throwIfCannotBroadcast(transaction: Interfaces.ITransaction): Promise<void> {
        await this.dynamicFeeMatcher.throwIfCannotBroadcast(transaction);
    }
}
