import { Identity } from "../identity/identity";
import { IVaultedKeyProvider } from "../vaultedKeyProvider/types";
export interface IIdentityWalletCreateArgs {
    vaultedKeyProvider: IVaultedKeyProvider;
    identity: Identity;
    publicKeyMetadata: IKeyMetadata;
}
export interface IKeyMetadata {
    signingKeyId: string;
    encryptionKeyId: string;
    [key: string]: string;
}
