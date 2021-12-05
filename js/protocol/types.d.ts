export declare type ContextEntry = string | {
    [key: string]: ContextEntry;
};
export declare type ClaimInterface = {
    [key: string]: string | number | boolean | ClaimInterface | ClaimInterface[];
};
