import {Identity} from "../identity/identity";
import {KeyTypes, PublicKeyInfo} from "../vaultedKeyProvider/types";
import {IKeyMetadata} from "../identityWallet/types";
import {ErrorCodes} from "../errors";

/**
 * Helper function to convert a key identifier to the owner did
 * @param keyId - public key identifier
 * @example `keyIdToDid('did:jolo:abc...fe#keys-1') // 'did:jolo:abc...fe'`
 * @internal
 */

export function keyIdToDid(keyId: string): string {
    return keyId.substring(0, keyId.indexOf('#'))
}

/**
 * Helper function to map DID Document key references to vkp key URNs
 * @param identity - Identity to map keys to
 * @param vkpKeys
 */
export const mapPublicKeys = async (
    identity: Identity,
    vkpKeys: PublicKeyInfo[],
): Promise<IKeyMetadata> => {
    const { keyId, did } = identity.didDocument.signer
    const signingKeyRef = keyId.includes('did:') ? keyId : `${did}${keyId}`
    const encKey = identity.didDocument.publicKey.find(
        k => k.type === KeyTypes.x25519KeyAgreementKey2019,
    )

    const encKeyRef =
        encKey &&
        (encKey.id.startsWith('did:')
            ? encKey.id
            : `${encKey.controller}${encKey.id}`)

    const sigKey = vkpKeys.some(k => k.controller.find(c => c === signingKeyRef))

    if (!sigKey) {
        throw new Error(ErrorCodes.PublicKeyNotFound)
    }

    return {
        signingKeyId: signingKeyRef,
        encryptionKeyId: encKeyRef,
    }
}