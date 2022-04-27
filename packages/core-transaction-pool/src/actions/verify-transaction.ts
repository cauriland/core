import { Services, Types } from "@cauriland/core-kernel";
import { Handlers } from "@cauriland/core-transactions";
import { Interfaces } from "@cauriland/crypto";

export class VerifyTransactionAction extends Services.Triggers.Action {
    public async execute(args: Types.ActionArguments): Promise<boolean> {
        const handler: Handlers.TransactionHandler = args.handler;
        const transaction: Interfaces.ITransaction = args.transaction;

        return handler.verify(transaction);
    }
}
