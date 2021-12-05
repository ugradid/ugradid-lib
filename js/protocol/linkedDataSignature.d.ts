/// <reference types="node" />
import { JsonLdObject } from "./linkedData";
export interface ISerializable {
    toJSON: () => {};
}
export interface IDigestable {
    signature: string;
    digest: () => Promise<Buffer>;
    asBytes: () => Promise<Buffer>;
    signer: {
        did: string;
        keyId: string;
    };
}
export interface ILinkedDataSignature extends IDigestable, ISerializable {
    creator: string;
    type: string;
    nonce: string;
    created: Date;
}
export interface ILinkedDataSignatureAttrs extends JsonLdObject {
    type: string;
    created: string;
    creator: string;
    nonce: string;
    signatureValue: string;
    id?: string;
}
