/// <reference types="node" />
import { Identity } from "../identity/identity";
import { IIdentityWalletCreateArgs, IKeyMetadata } from "./types";
export declare class IdentityWallet {
    private _identity;
    private _publicKeyMetadata;
    private _keyProvider;
    get did(): string;
    set did(did: string);
    get identity(): Identity;
    set identity(identity: Identity);
    get didDocument(): import("../identity/didDocument/didDocument").DidDocument;
    set didDocument(didDocument: import("../identity/didDocument/didDocument").DidDocument);
    get publicKeyMetadata(): IKeyMetadata;
    set publicKeyMetadata(metadata: IKeyMetadata);
    constructor({ identity, publicKeyMetadata, vaultedKeyProvider, }: IIdentityWalletCreateArgs);
    getPublicKeys: (encryptionPass: string) => Promise<import("../vaultedKeyProvider/types").PublicKeyInfo[]>;
    sign: (data: Buffer, pass: string) => Promise<Buffer>;
}
