import { AppProps } from '@polkadot/ui-app/types';
export declare type LocationProps = {
    match: {
        params: {
            [index: string]: any;
        };
    };
};
export declare type ComponentProps = AppProps & LocationProps;
declare type BaseInfo = {
    name: string;
    genesisHash: string;
};
export declare type CodeJson = BaseInfo & {
    abi?: string | null;
    codeHash: string;
};
export declare type ContractJson = BaseInfo & {
    abi: string;
    address: string;
};
export {};
