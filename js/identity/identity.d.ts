import { IDidDocumentAttrs } from "../protocol/didDocument";
import { DidDocument } from "./didDocument/didDocument";
import { IIdentityCreateArgs } from "./types";
interface IdentityAttributes {
    didDocument: IDidDocumentAttrs;
}
export declare class Identity {
    private _didDocument;
    get did(): string;
    set did(did: string);
    get didDocument(): DidDocument;
    set didDocument(didDocument: DidDocument);
    static fromDidDocument({ didDocument, }: IIdentityCreateArgs): Identity;
    toJSON(): IdentityAttributes;
    static fromJSON(json: IdentityAttributes): Identity;
}
export {};
