import { Container, Contracts } from "@cauriland/core-kernel";
import { Interfaces } from "@cauriland/crypto";

import { BlockProcessorResult } from "../block-processor";
import { BlockHandler } from "../contracts";

@Container.injectable()
export class InvalidGeneratorHandler implements BlockHandler {
    @Container.inject(Container.Identifiers.Application)
    protected readonly app!: Contracts.Kernel.Application;

    @Container.inject(Container.Identifiers.BlockchainService)
    protected readonly blockchain!: Contracts.Blockchain.Blockchain;

    public async execute(block?: Interfaces.IBlock): Promise<BlockProcessorResult> {
        this.blockchain.resetLastDownloadedBlock();

        return BlockProcessorResult.Rejected;
    }
}
