import {SoftwareKeyProvider} from "../vaultedKeyProvider/softwareKeyProvider";
import {IRegistrar} from "./types";
import {IdentityWallet} from "../identityWallet/identityWallet";
import {mapPublicKeys} from "../utils/helper";
import {Identity} from "../identity/identity";
import {IdentityOrResolver} from "../utils/validation";

export const createIdentityFromKeyProvider = async (
    vaultedKeyProvider: SoftwareKeyProvider,
    decryptionPassword: string,
    registrar: IRegistrar,
) => {
    const identity = await registrar.create(
        vaultedKeyProvider,
        decryptionPassword,
    )

    const vaultKeys = await vaultedKeyProvider.getPubKeys(decryptionPassword)

    return new IdentityWallet({
        identity,
        vaultedKeyProvider,
        publicKeyMetadata: await mapPublicKeys(identity, vaultKeys),
    })
}

export const authAsIdentityFromKeyProvider = async (
    vkp: SoftwareKeyProvider,
    pass: string,
    identityOrResolver: IdentityOrResolver,
) => {
    const identity =
        identityOrResolver instanceof Identity
            ? identityOrResolver
            : await identityOrResolver.resolve(vkp.id)

    const vaultKeys = await vkp.getPubKeys(pass)

    return new IdentityWallet({
        vaultedKeyProvider: vkp,
        identity,
        publicKeyMetadata: await mapPublicKeys(identity, vaultKeys),
    })
}