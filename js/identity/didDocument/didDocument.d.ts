import { IDidDocumentAttrs } from "../../protocol/didDocument";
import { PublicKeySection } from "./sections/publicKeySection";
import { ISigner } from "../../credentials/signedCredentials/types";
export declare class DidDocument {
    private _id;
    private _publicKey;
    private _proof;
    get did(): string;
    set did(did: string);
    get publicKey(): PublicKeySection[];
    set publicKey(value: PublicKeySection[]);
    get signer(): ISigner;
    toJSON(): IDidDocumentAttrs;
    static fromJSON(json: IDidDocumentAttrs): DidDocument;
}
