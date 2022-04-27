import { Contracts, Services } from "@cauriland/core-kernel";
import { Wallet } from "./wallet";

export const walletFactory = (
    attributeSet: Services.Attributes.AttributeSet,
    events?: Contracts.Kernel.EventDispatcher,
) => {
    return (address: string) => {
        return new Wallet(address, new Services.Attributes.AttributeMap(attributeSet), events);
    };
};
