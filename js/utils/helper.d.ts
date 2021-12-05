import { Identity } from "../identity/identity";
import { PublicKeyInfo } from "../vaultedKeyProvider/types";
import { IKeyMetadata } from "../identityWallet/types";
export declare function keyIdToDid(keyId: string): string;
export declare const mapPublicKeys: (identity: Identity, vkpKeys: PublicKeyInfo[]) => Promise<IKeyMetadata>;
