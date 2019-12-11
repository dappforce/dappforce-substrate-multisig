import { Struct } from '@polkadot/types/codec';
import { AccountId, u16, u64, Vector, u8, bool, BalanceOf } from '@polkadot/types';
import { Change, VecAccountId } from '@dappforce/types/blogs';
export declare class TransactionId extends u64 {
}
export declare type WalletType = {
    created: Change;
    id: AccountId;
    owners: AccountId[];
    max_tx_value: BalanceOf;
    confirms_required: u16;
    pending_tx_count: u16;
    executed_tx_count: u64;
};
export declare class Wallet extends Struct {
    constructor(value?: WalletType);
    readonly created: Change;
    readonly id: AccountId;
    readonly owners: VecAccountId;
    readonly max_tx_value: BalanceOf;
    readonly confirms_required: u16;
    readonly pending_tx_count: u16;
    readonly executed_tx_count: u64;
}
export declare type TransactionType = {
    created: Change;
    id: TransactionId;
    destination: AccountId;
    value: BalanceOf;
    notes: Vector<u8>;
    confirmed_by: AccountId[];
    executed: boolean;
};
export declare class Transaction extends Struct {
    constructor(value?: TransactionType);
    readonly created: Change;
    readonly id: AccountId;
    readonly destination: AccountId;
    readonly value: BalanceOf;
    readonly confirmed_by: VecAccountId;
    readonly notes: string;
    readonly executed: bool;
}
export declare function registerMultiSigTypes(): void;
