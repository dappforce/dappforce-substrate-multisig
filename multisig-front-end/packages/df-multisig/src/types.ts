import { Struct } from '@polkadot/types/codec';
import { getTypeRegistry, AccountId, u16, u64, Text, Vector, u8, bool, BalanceOf } from '@polkadot/types';
import { Change, VecAccountId } from '@dappforce/types/blogs';

export class TransactionId extends u64 {}

export type WalletType = {
  created: Change,
  id: AccountId,
  owners: AccountId[],
  max_tx_value: BalanceOf,
  confirms_required: u16,
  pending_tx_count: u16,
  executed_tx_count: u64
};

export class Wallet extends Struct {
  constructor (value?: WalletType) {
    super({
      created: Change,
      id: AccountId,
      owners: VecAccountId,
      max_tx_value: BalanceOf,
      confirms_required: u16,
      pending_tx_count: u16,
      executed_tx_count: u64
    }, value);
  }

  get created (): Change {
    return this.get('created') as Change;
  }

  get id (): AccountId {
    return this.get('id') as AccountId;
  }

  get owners (): VecAccountId {
    return this.get('owners') as VecAccountId;
  }

  get max_tx_value (): BalanceOf {
    return this.get('max_tx_value') as BalanceOf;
  }

  get confirms_required (): u16 {
    return this.get('confirms_required') as u16;
  }

  get pending_tx_count (): u16 {
    return this.get('pending_tx_count') as u16;
  }

  get executed_tx_count (): u64 {
    return this.get('executed_tx_count') as u64;
  }
}

export type TransactionType = {
  created: Change,
  id: TransactionId,
  destination: AccountId,
  value: BalanceOf,
  notes: Vector<u8>,
  confirmed_by: AccountId[],
  executed: boolean
};

export class Transaction extends Struct {
  constructor (value?: TransactionType) {
    super({
      created: Change,
      id: TransactionId,
      destination: AccountId,
      value: BalanceOf,
      notes: Text,
      confirmed_by: VecAccountId,
      executed: bool
    }, value);
  }

  get created (): Change {
    return this.get('created') as Change;
  }

  get id (): AccountId {
    return this.get('id') as AccountId;
  }

  get destination (): AccountId {
    return this.get('destination') as AccountId;
  }

  get value (): BalanceOf {
    return this.get('value') as BalanceOf;
  }

  get confirmed_by (): VecAccountId {
    return this.get('confirmed_by') as VecAccountId;
  }

  get notes (): string {
    const notes = this.get('notes') as Text;
    return notes.toString();
  }

  get executed (): bool {
    return this.get('executed') as bool;
  }
}

export function registerMultiSigTypes () {
  try {
    const typeRegistry = getTypeRegistry();
    typeRegistry.register({
      TransactionId,
      BalanceOf,
      Wallet,
      Transaction
    });
  } catch (err) {
    console.error('Failed to register custom types of blogs module', err);
  }
}
