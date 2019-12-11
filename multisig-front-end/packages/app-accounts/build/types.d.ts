import { AppProps } from '@polkadot/ui-app/types';
export declare type LocationProps = {
    match: {
        params: {
            [index: string]: any;
        };
    };
};
export declare type ComponentProps = AppProps & LocationProps;
