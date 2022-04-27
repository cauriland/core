import { Contracts } from "@cauriland/core-kernel";
import { Handlers } from "@cauriland/core-transactions";
import { Interfaces as CryptoInterfaces, Managers, Utils } from "@cauriland/crypto";

export abstract class MagistrateTransactionHandler extends Handlers.TransactionHandler {
    public async isActivated(): Promise<boolean> {
        const milestone = Managers.configManager.getMilestone();
        return milestone.aip11 === true && !milestone.aip36;
    }

    public async throwIfCannotBeApplied(
        transaction: CryptoInterfaces.ITransaction,
        wallet: Contracts.State.Wallet,
    ): Promise<void> {
        if (Utils.isException(transaction.data)) {
            return;
        }

        return super.throwIfCannotBeApplied(transaction, wallet);
    }
}
