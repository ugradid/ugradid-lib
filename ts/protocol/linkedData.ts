import {ContextEntry} from "./types";
import {ILinkedDataSignatureAttrs} from "./linkedDataSignature";

type JsonLdPrimitive = string | number | boolean | JsonLdObject | JsonLdObject[]

export type JsonLdContext = ContextEntry | ContextEntry[]

export interface JsonLdObject {
    '@context'?: JsonLdContext
    [key: string]: JsonLdPrimitive | JsonLdPrimitive[]
}

export interface SignedJsonLdObject extends JsonLdObject {
    proof: ILinkedDataSignatureAttrs
}