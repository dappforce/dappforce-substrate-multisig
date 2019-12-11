import { StorageFunction } from '@polkadot/types/primitive/StorageKey';
import { RawParams } from '@polkadot/ui-params/types';
declare type IdQuery = {
    id: number;
};
export declare type PartialModuleQuery = {
    key: StorageFunction;
    params: RawParams;
};
export declare type StorageModuleQuery = PartialModuleQuery & IdQuery;
export declare type PartialRawQuery = {
    key: Uint8Array;
};
export declare type StorageRawQuery = PartialRawQuery & IdQuery;
export declare type QueryTypes = StorageModuleQuery | StorageRawQuery;
export declare type ParitalQueryTypes = PartialModuleQuery | PartialRawQuery;
export declare type ComponentProps = {
    onAdd: (query: ParitalQueryTypes) => void;
};
export {};
