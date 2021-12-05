import {Identity} from "../identity/identity";
import {IIdentityWalletCreateArgs, IKeyMetadata} from "./types";
import {ErrorCodes} from "../errors";
import {IVaultedKeyProvider} from "../vaultedKeyProvider/types";

/**
 * @class
 * Developer facing class with initialized instance of the key provider as member.
 * Encapsulates functionality related to creating and signing credentials and
 * interaction tokens
 */

export class IdentityWallet {
    private _identity: Identity
    private _publicKeyMetadata: IKeyMetadata
    private _keyProvider: IVaultedKeyProvider

    /**
     * Get the did associated with the identity wallet
     * @example `console.log(identityWallet.did) // 'did:ugra:...'`
     */

    public get did(): string {
        return this.identity.did
    }

    /**
     * Set the did associated with the identity wallet
     * @example `identityWallet.did = 'did:ugra:...'`
     */

    public set did(did: string) {
        this.identity.did = did
    }

    /**
     * Get the {@link Identity} associated with the identity wallet
     * @example `console.log(identityWallet.identity) // Identity {...}`
     */

    public get identity() {
        return this._identity
    }

    /**
     * Get the {@link Identity} associated with the identity wallet
     * @example `identityWallet.identity = Identity.fromDidDocument(...)`
     */

    public set identity(identity: Identity) {
        this._identity = identity
    }

    /**
     * Get the {@link DidDocument} associated wtith the identity wallet
     * @example `console.log(identityWallet.didDocument) // DidDocument {...}`
     */

    public get didDocument() {
        return this.identity.didDocument
    }

    /**
     * Set the {@link DidDocument} associated wtith the identity wallet
     * @example `identityWallet.didDocument = DidDocument.fromPublicKey(...)`
     */

    public set didDocument(didDocument) {
        this.identity.didDocument = didDocument
    }

    /**
     * Get the metadata about the key pair associated wtith the identity wallet
     * @example `console.log(identityWallet.publicKeyMetadata) // {derivationPath: '...', keyId: '...'}`
     */

    public get publicKeyMetadata(): IKeyMetadata {
        return this._publicKeyMetadata
    }

    /**
     * Set the metadata about the key pair associated wtith the identity wallet
     * @example `identityWallet.publicKeyMetadata = {derivationPath: '...', keyId: '...'}`
     */

    public set publicKeyMetadata(metadata: IKeyMetadata) {
        this._publicKeyMetadata = metadata
    }

    /**
     * @constructor
     * @param identity - Instance of {@link Identity} class, containing a {@link DidDocument}
     * @param publicKeyMetadata - Public key id and derivation path
     * @param vaultedKeyProvider - Vaulted key store for generating signatures
     * @param contractsGateway - Instance of connector to the used smart contract chain
     */
    public constructor({
                           identity,
                           publicKeyMetadata,
                           vaultedKeyProvider,
                       }: IIdentityWalletCreateArgs) {
        if (!identity || !publicKeyMetadata || !vaultedKeyProvider) {
            throw new Error(ErrorCodes.IDWInvalidCreationArgs)
        }

        this.identity = identity
        this.publicKeyMetadata = publicKeyMetadata
        this._keyProvider = vaultedKeyProvider
    }

    /**
     * Derives all public keys listed in the {@link KeyTypes} enum
     * @param encryptionPass - password for interfacing with the vaulted key provider
     * @example `iw.getPublicKeys('secret')` // { IdentityKey: '0xabc...ff', Key: '0xabc...ff'}
     */
    public getPublicKeys = (encryptionPass: string) =>
        this._keyProvider.getPubKeys(encryptionPass)

    /**
     * Signs data
     *
     * @param data - The data to sign
     * @param pass - The VKP password
     */
    public sign = async (data: Buffer, pass: string) =>
        this._keyProvider.sign(
            {
                encryptionPass: pass,
                keyRef: this._publicKeyMetadata.signingKeyId,
            },
            data,
        )


}