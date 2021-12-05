import {IDidDocumentAttrs} from "../protocol/didDocument";
import {classToPlain, Exclude, Expose, plainToClass, Type} from "class-transformer";
import {DidDocument} from "./didDocument/didDocument";
import {IIdentityCreateArgs} from "./types";

/**
 * @class
 * Class representing an identity, combines a {@link DidDocument}
 */
interface IdentityAttributes {
    didDocument: IDidDocumentAttrs
}

@Exclude()
export class Identity {
    private _didDocument: DidDocument

    /**
     * Get the identity did
     * @example `console.log(identity.did) // 'did:ugra:...'`
     */

    get did() {
        return this.didDocument.did
    }

    /**
     * Set the identity did
     * @example `identity.did = 'did:ugra:...'`
     */

    set did(did: string) {
        this.didDocument.did = did
    }

    /**
     * Get the did document associated with the identity
     * @example `console.log(identity.didDocument) // DidDocument {...}`
     */
    @Expose()
    @Type(() => DidDocument)
    get didDocument(): DidDocument {
        return this._didDocument
    }

    /**
     * Set did document associated with the identity
     * @example `identity.didDocument = DidDocument.fromPublicKey(...)`
     */
    set didDocument(didDocument: DidDocument) {
        this._didDocument = didDocument
    }

    /**
     * Instantiates the {@link Identity} class based on a did document and public profile
     * @param didDocument - The did document associated with a did
     * @example `const identity = Identity.fromDidDocument({didDocument})`
     */
    public static fromDidDocument({
                                      didDocument,
                                  }: IIdentityCreateArgs): Identity {
        const identity = new Identity()
        identity.didDocument = didDocument
        return identity
    }

    /**
     * Serializes the {@link Identity}
     */
    public toJSON(): IdentityAttributes {
        return classToPlain(this) as IdentityAttributes
    }

    /**
     * Instantiates an {@link Identity} from it's JSON form
     * @param json - JSON containing {link @Identity} members
     */
    public static fromJSON(json: IdentityAttributes): Identity {
        return plainToClass(Identity, json)
    }
}