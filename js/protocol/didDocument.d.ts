import { JsonLdObject } from "./linkedData";
import { ContextEntry } from "./types";
import { ILinkedDataSignatureAttrs } from "./linkedDataSignature";
export interface IDidDocumentAttrs {
    '@context': ContextEntry[] | string;
    id: string;
    publicKey?: IPublicKeySectionAttrs[];
    service?: IServiceEndpointSectionAttrs[];
    created?: string;
    proof?: ILinkedDataSignatureAttrs;
}
export interface IServiceEndpointSectionAttrs extends JsonLdObject {
    id: string;
    type: string;
    serviceEndpoint: string;
    description: string;
}
export interface IPublicKeySectionAttrs extends JsonLdObject {
    id: string;
    type: string;
    publicKeyHex: string;
}
