import { SoftwareKeyProvider } from "../vaultedKeyProvider/softwareKeyProvider";
import { IRegistrar } from "./types";
import { IdentityWallet } from "../identityWallet/identityWallet";
import { IdentityOrResolver } from "../utils/validation";
export declare const createIdentityFromKeyProvider: (vaultedKeyProvider: SoftwareKeyProvider, decryptionPassword: string, registrar: IRegistrar) => Promise<IdentityWallet>;
export declare const authAsIdentityFromKeyProvider: (vkp: SoftwareKeyProvider, pass: string, identityOrResolver: IdentityOrResolver) => Promise<IdentityWallet>;
