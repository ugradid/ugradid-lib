import {classToPlain, Exclude, Expose, plainToClass, Transform} from "class-transformer";
import {IDidDocumentAttrs} from "../../protocol/didDocument";
import {PublicKeySection} from "./sections/publicKeySection";
import {ISigner} from "../../credentials/signedCredentials/types";
import {EcdsaLinkedDataSignature} from "../../linkedDataSignature/suites/ecdsaKoblitzSignature2016";
import {ILinkedDataSignature} from "../../protocol/linkedDataSignature";

@Exclude()
export class DidDocument {
    private _id: string
    private _publicKey: PublicKeySection[] = []
    private _proof: ILinkedDataSignature = new EcdsaLinkedDataSignature()

    /**
     * Get the did associated with the did document
     * @example `console.log(didDocument.id) //claimId:25453fa543da7`
     */

    @Expose({name: 'id'})
    public get did(): string {
        return this._id
    }

    /**
     * Set the did associated with the did document
     * @example `didDocument.id = 'claimId:25453fa543da7'`
     */

    public set did(did: string) {
        this._id = did
    }

    /**
     * Get the did document public key sections
     * @example `console.log(didDocument.publicKey) // [PublicKeySection {...}, ...]`
     */

    @Expose()
    @Transform(
        (pubKeys, rest) => {
            const { verificationMethod } = rest
            if (verificationMethod && verificationMethod.length) {
                return [...(pubKeys || []), ...verificationMethod]
            }

            return pubKeys || []
        },
        { toClassOnly: true },
    )
    @Transform(pubKeys => pubKeys && pubKeys.map(PublicKeySection.fromJSON))
    public get publicKey(): PublicKeySection[] {
        return this._publicKey
    }

    /**
     * Set the did document public key sections
     * @example `didDocument.publicKey = [PublicKeySection {...}, ...]`
     */

    public set publicKey(value: PublicKeySection[]) {
        this._publicKey = value
    }

    /**
     * Get aggregated metadata related to the signing public key
     * @see {@link https://w3c-ccg.github.io/did-spec/#public-keys | specification}
     * @example `console.log(didDocument.signer) // { did: 'did:ugra:...', keyId: 'did:ugra:...#keys-1' }`
     */

    public get signer(): ISigner {
        return {
            did: this._id,
            keyId: (this._proof && this._proof.creator) || this._publicKey[0].id,
        }
    }

    /**
     * Serializes the {@link DidDocument} as JSON-LD
     */

    public toJSON(): IDidDocumentAttrs {
        return classToPlain(this) as IDidDocumentAttrs
    }

    /**
     * Instantiates a {@link DidDocument} from it's JSON form
     * @param json - Verifiable Credential in JSON-LD form
     */

    public static fromJSON(json: IDidDocumentAttrs): DidDocument {
        return plainToClass(DidDocument, json)
    }
}