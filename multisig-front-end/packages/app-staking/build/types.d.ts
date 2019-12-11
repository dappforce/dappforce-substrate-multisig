import BN from 'bn.js';
import { DerivedBalancesMap } from '@polkadot/api-derive/types';
import { AccountId, BlockNumber } from '@polkadot/types';
export declare type Nominators = {
    [index: string]: Array<string>;
};
export declare type ComponentProps = {
    balances: DerivedBalancesMap;
    controllers: Array<string>;
    recentlyOffline: RecentlyOfflineMap;
    stashes: Array<string>;
    validators: Array<string>;
};
export declare type RecentlyOffline = Array<[AccountId, BlockNumber, BN]>;
export declare type RecentlyOfflineMap = {
    [s: string]: Array<OfflineStatus>;
};
export interface OfflineStatus {
    blockNumber: BlockNumber;
    count: BN;
}
export declare type AccountFilter = 'all' | 'controller' | 'session' | 'stash' | 'unbonded';
