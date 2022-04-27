import { Interfaces } from "@cauriland/crypto";

import { BlockProcessorResult } from "./block-processor";

export interface BlockHandler {
    execute(block?: Interfaces.IBlock): Promise<BlockProcessorResult>;
}
