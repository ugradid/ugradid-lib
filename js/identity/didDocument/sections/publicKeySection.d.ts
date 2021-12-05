/// <reference types="node" />
import { IPublicKeySectionAttrs } from "../../../protocol/didDocument";
export declare class PublicKeySection {
    private _id;
    private _type;
    private _controller;
    private _publicKeyHex;
    get controller(): string;
    set controller(controller: string);
    get id(): string;
    set id(id: string);
    get type(): string;
    set type(type: string);
    get publicKeyHex(): string;
    set publicKeyHex(keyHex: string);
    static fromEcdsa(publicKey: Buffer, id: string, did: string): PublicKeySection;
    toJSON(): IPublicKeySectionAttrs;
    static fromJSON(json: IPublicKeySectionAttrs): PublicKeySection;
}
