import { Managers, Utils } from "@cauriland/crypto";

export const isRecipientOnActiveNetwork = (recipientId: string): boolean =>
    Utils.Base58.decodeCheck(recipientId).readUInt8(0) === Managers.configManager.get("network.pubKeyHash");
