/// <reference types="node" />
import { EncryptedWalletUtils, IKeyRefArgs, IVaultedKeyProvider, KeyTypes, PublicKeyInfo } from "./types";
export declare class SoftwareKeyProvider implements IVaultedKeyProvider {
    private _encryptedWallet;
    private _id;
    private readonly _utils;
    constructor(utils: EncryptedWalletUtils, encryptedWallet: Buffer, id: string);
    static newEmptyWallet(utils: EncryptedWalletUtils, id: string, pass: string): Promise<SoftwareKeyProvider>;
    get encryptedWallet(): string;
    get id(): string;
    changePass(pass: string, newPass: string): Promise<void>;
    changeId(pass: string, newId: string): Promise<void>;
    newKeyPair(pass: string, keyType: KeyTypes, controller?: string): Promise<PublicKeyInfo>;
    addContent(pass: string, content: any): Promise<void>;
    getPubKey({ encryptionPass, keyRef }: IKeyRefArgs): Promise<PublicKeyInfo>;
    getPubKeyByController(pass: string, controller: string): Promise<PublicKeyInfo>;
    setKeyController({ encryptionPass, keyRef }: IKeyRefArgs, controller: string): Promise<void>;
    getPubKeys(pass: string): Promise<PublicKeyInfo[]>;
    sign(refArgs: IKeyRefArgs, data: Buffer): Promise<Buffer>;
    decrypt(refArgs: IKeyRefArgs, data: Buffer): Promise<Buffer>;
    ecdhKeyAgreement(refArgs: IKeyRefArgs, pubKey: Buffer): Promise<Buffer>;
}
