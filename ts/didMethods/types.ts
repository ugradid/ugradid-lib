import {Identity} from "../identity/identity";
import {SoftwareKeyProvider} from "../vaultedKeyProvider/softwareKeyProvider";

export interface IRegistrar {
    prefix: string
    create: (keyProvider: SoftwareKeyProvider, password: string) => Promise<Identity>
}

export interface IResolver {
    prefix: string
    resolve: (did: string) => Promise<Identity>
}

export interface IDidMethod {
    prefix: string
    resolver: IResolver
    registrar: IRegistrar
}