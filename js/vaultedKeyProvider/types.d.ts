/// <reference types="node" />
export interface IKeyRefArgs {
    encryptionPass: string;
    keyRef: string;
}
export interface AddKeyResult {
    newEncryptedState: string;
    newKey: PublicKeyInfo;
}
export declare enum KeyTypes {
    jwsVerificationKey2020 = "JwsVerificationKey2020",
    ecdsaSecp256k1VerificationKey2019 = "EcdsaSecp256k1VerificationKey2019",
    ed25519VerificationKey2018 = "Ed25519VerificationKey2018",
    ecdsaSecp256k1RecoveryMethod2020 = "EcdsaSecp256k1RecoveryMethod2020",
    x25519KeyAgreementKey2019 = "X25519KeyAgreementKey2019"
}
export interface IVaultedKeyProvider {
    getPubKey: (refArgs: IKeyRefArgs) => Promise<PublicKeyInfo>;
    getPubKeyByController: (pass: string, controller: string) => Promise<PublicKeyInfo>;
    getPubKeys: (pass: string) => Promise<PublicKeyInfo[]>;
    sign: (refArgs: IKeyRefArgs, data: Buffer) => Promise<Buffer>;
    decrypt: (refArgs: IKeyRefArgs, data: Buffer) => Promise<Buffer>;
    newKeyPair: (pass: string, keyType: KeyTypes, controller?: string) => Promise<PublicKeyInfo>;
    ecdhKeyAgreement: (refArgs: IKeyRefArgs, pubKey: Buffer) => Promise<Buffer>;
}
export interface PublicKeyInfo {
    id: string;
    type: KeyTypes;
    publicKeyHex: string;
    controller: string[];
}
export interface ICryptoProvider {
    verify: (key: Buffer, type: KeyTypes, data: Buffer, sig: Buffer) => Promise<boolean>;
    encrypt: (key: Buffer, type: KeyTypes, toEncrypt: Buffer) => Promise<Buffer>;
    getRandom: (nr: number) => Promise<Buffer>;
}
export interface EncryptedWalletUtils {
    newWallet: (id: string, pass: string) => Promise<string>;
    changePass: (encryptedWallet: string, id: string, oldPass: string, newPass: string) => Promise<string>;
    changeId: (encryptedWallet: string, id: string, newId: string, pass: string) => Promise<string>;
    newKey: (encryptedWallet: string, id: string, pass: string, keyType: string, controller?: string) => Promise<string>;
    addContent: (encryptedWallet: string, id: string, pass: string, content: string) => Promise<string>;
    getKey: (encryptedWallet: string, id: string, pass: string, keyRef: string) => Promise<string>;
    getKeyByController: (encryptedWallet: string, id: string, pass: string, controller: string) => Promise<string>;
    setKeyController: (encryptedWallet: string, id: string, pass: string, keyRef: string, controller: string) => Promise<string>;
    getKeys: (encryptedWallet: string, id: string, pass: string) => Promise<string>;
    sign: (encryptedWallet: string, id: string, pass: string, keyRef: string, data: string) => Promise<string>;
    decrypt: (encryptedWallet: string, id: string, pass: string, keyRef: string, ciphertext: string) => Promise<string>;
    ecdhKeyAgreement: (encryptedWallet: string, id: string, pass: string, keyRef: string, pubKey: string) => Promise<string>;
}
export interface CryptoUtils {
    getRandom: (len: number) => Promise<string>;
    verify: (key: string, type: string, data: string, sig: string) => Promise<boolean>;
    encrypt: (key: string, type: string, toEncrypt: string) => Promise<string>;
}
