
export type ContextEntry = string | { [key: string]: ContextEntry }

export type ClaimInterface = {
    [key: string]: string | number | boolean | ClaimInterface | ClaimInterface[]
}