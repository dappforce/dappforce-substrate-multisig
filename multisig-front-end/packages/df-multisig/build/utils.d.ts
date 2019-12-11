import { Options as QueryOptions } from '@polkadot/ui-api/with/types';
export declare const queryMultisigToProp: (storageItem: string, paramNameOrOpts?: string | QueryOptions | undefined) => [string, QueryOptions];
export declare type UrlHasIdProps = {
    match: {
        params: {
            id: string;
        };
    };
};
