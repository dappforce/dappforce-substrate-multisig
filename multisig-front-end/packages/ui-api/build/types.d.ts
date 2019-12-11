/// <reference types="react" />
import { SubmittableExtrinsicFunction } from '@polkadot/api/promise/types';
import ApiPromise from '@polkadot/api/promise';
export declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export declare type Subtract<T, K> = Omit<T, keyof K>;
export declare type BareProps = {
    className?: string;
    style?: {
        [index: string]: any;
    };
};
export declare type ApiProps = {
    api: ApiPromise;
    apiDefaultTx: SubmittableExtrinsicFunction;
    isApiConnected: boolean;
    isApiReady: boolean;
    isDevelopment: boolean;
    setApiUrl: (url?: string) => void;
};
export declare type OnChangeCb$Obs = {
    next: (value?: any) => any;
};
export declare type OnChangeCb$Fn = (value?: any) => any;
export declare type OnChangeCb = OnChangeCb$Obs | OnChangeCb$Fn;
export declare type ChangeProps = {
    callOnResult?: OnChangeCb;
};
export declare type CallState = {
    callResult?: any;
    callUpdated?: boolean;
    callUpdatedAt?: number;
};
export declare type CallProps = ApiProps & CallState;
export declare type BaseProps<T> = BareProps & CallProps & ChangeProps & {
    children?: React.ReactNode;
    label?: string;
    render?: (value?: T) => React.ReactNode;
};
export declare type Formatter = (value?: any) => string;
