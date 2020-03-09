#![cfg(test)]

use super::mock::*;
use super::wallet::*;

use runtime_io::with_externalities;
use support::*;

const ACCOUNT1 : AccountId = 1;
const ACCOUNT2 : AccountId = 2;
const ACCOUNT3 : AccountId = 3;
const ACCOUNT4 : AccountId = 4;
const ACCOUNT5 : AccountId = 5;

const WALLET1 : AccountId = 10;
const WALLET2 : AccountId = 11;

fn deposit_wallet(wallet_id: AccountId, value: BalanceOf) {
  assert!(wallet_by_id(wallet_id).is_some());

  let _ = Balances::deposit_creating(&wallet_id, value);
}

fn default_walletid() -> AccountId {
  WALLET1
}

fn wallet_by_id(wallet_id: AccountId) -> Option<Wallet<Test>> {
  MultisigWallet::wallet_by_id(wallet_id)
}

fn wallet_ids_by_account_id(account: AccountId) -> Vec<AccountId> {
  MultisigWallet::wallet_ids_by_account_id(account)
}

fn tx_by_id(tx_id: TransactionId) -> Option<Transaction<Test>> {
  MultisigWallet::tx_by_id(tx_id)
}

fn pending_tx_ids_by_wallet_id(wallet_id: AccountId) -> Vec<TransactionId> {
  MultisigWallet::pending_tx_ids_by_wallet_id(wallet_id)
}

fn executed_tx_ids_by_wallet_id(wallet_id: AccountId) -> Vec<TransactionId> {
  MultisigWallet::executed_tx_ids_by_wallet_id(wallet_id)
}

fn next_tx_id() -> TransactionId {
  MultisigWallet::next_tx_id()
}

fn _create_default_wallet() -> dispatch::Result {
  _create_wallet(None, None, None, None, None)
}

fn _create_wallet(origin: Option<Origin>, wallet_id: Option<AccountId>, owners: Option<Vec<AccountId>>, max_tx_value: Option<BalanceOf>, confirms_required: Option<u16>) -> dispatch::Result {
  MultisigWallet::create_wallet(
    origin.unwrap_or(Origin::signed(ACCOUNT1)),
    wallet_id.unwrap_or(self::default_walletid()),
    owners.unwrap_or(vec![ACCOUNT1, ACCOUNT2, ACCOUNT3]),
    max_tx_value.unwrap_or(100),
    confirms_required.unwrap_or(2)
  )
}

fn _submit_default_transaction() -> dispatch::Result {
  _submit_transaction(None, None, None, None, None)
}

fn _submit_transaction(origin: Option<Origin>, wallet_id: Option<AccountId>, destinaton: Option<AccountId>, value: Option<BalanceOf>, notes: Option<Vec<u8>>) -> dispatch::Result {
  MultisigWallet::submit_transaction(
    origin.unwrap_or(Origin::signed(ACCOUNT1)),
    wallet_id.unwrap_or(WALLET1),
    destinaton.unwrap_or(ACCOUNT5),
    value.unwrap_or(50),
    notes.unwrap_or(vec![])
  )
}

fn _confirm_default_transaction() -> dispatch::Result {
  _confirm_transaction(None, None, None)
}

fn _confirm_transaction(origin: Option<Origin>, wallet_id: Option<AccountId>, tx_id: Option<TransactionId>) -> dispatch::Result {
  MultisigWallet::confirm_transaction(
    origin.unwrap_or(Origin::signed(ACCOUNT2)),
    wallet_id.unwrap_or(WALLET1),
    tx_id.unwrap_or(1)
  )
}

// Create wallet tests

#[test]
fn create_wallet_should_work() {
  with_externalities(&mut test_ext(), || {
    assert_ok!(_create_default_wallet()); // WalletId: WALLET1

    let wallet = wallet_by_id(WALLET1).unwrap();

    // Check whether data was stored correcty
    assert_eq!(wallet.created.account, ACCOUNT1);
    assert_eq!(wallet.id, WALLET1);
    assert_eq!(wallet.owners, vec![ACCOUNT1, ACCOUNT2, ACCOUNT3]);
    assert_eq!(wallet.max_tx_value, 100);
    assert_eq!(wallet.confirms_required, 2);
    assert_eq!(wallet.pending_tx_count, 0);
    assert_eq!(wallet.executed_tx_count, 0);

    assert_eq!(wallet_ids_by_account_id(ACCOUNT1), vec![WALLET1]);
    assert_eq!(wallet_ids_by_account_id(ACCOUNT2), vec![WALLET1]);
    assert_eq!(wallet_ids_by_account_id(ACCOUNT3), vec![WALLET1]);
  });
}

#[test]
fn create_wallet_should_fail_empty_owners() {
  with_externalities(&mut test_ext(), || {
    assert_noop!(_create_wallet(None, None, Some(vec![]), None, None), MSG_NOT_ENOUGH_OWNERS);
  });
}

#[test]
fn create_wallet_should_fail_too_many_owners() {
  with_externalities(&mut test_ext(), || {
    let accounts : Vec<u64> = (1..MAX_WALLET_OWNERS as u64 + 2).collect();

    assert_noop!(_create_wallet(None, None, Some(accounts), None, None), MSG_TOO_MANY_OWNERS);
  });
}

#[test]
fn create_wallet_should_fail_too_many_confirms_required() {
  with_externalities(&mut test_ext(), || {
    assert_noop!(_create_wallet(None, None, None, None, Some(10)), MSG_CONFIRMS_NUMBER_EXCEEDS_OWNERS);
  });
}

#[test]
fn create_wallet_should_fail_no_confirms_required() {
  with_externalities(&mut test_ext(), || {
    assert_noop!(_create_wallet(None, None, None, None, Some(0)), MSG_CANNOT_REQUIRE_ZERO_CONFIRMS);
  });
}

#[test]
fn create_wallet_should_fail_zero_max_tx_value() {
  with_externalities(&mut test_ext(), || {
    assert_noop!(_create_wallet(None, None, None, Some(0), None), MSG_MAX_TX_VALUE_LOWER_THAN_ALLOWED);
  });
}

// Submit transaction tests

#[test]
fn submit_transaction_should_work() {
  with_externalities(&mut test_ext(), || {
    assert_ok!(_create_default_wallet()); // WalletId: WALLET1
    deposit_wallet(WALLET1, 1000);
    assert_ok!(_submit_default_transaction()); // TransactionId 1

    // Check whether data was stored correcty
    assert_eq!(next_tx_id(), 2);

    let tx = tx_by_id(1).unwrap();
    assert_eq!(tx.created.account, ACCOUNT1);
    assert_eq!(tx.id, 1);
    assert_eq!(tx.destination, ACCOUNT5);
    assert_eq!(tx.value, 50);
    assert!(tx.notes.is_empty());
    assert_eq!(tx.confirmed_by, vec![ACCOUNT1]);
    assert_eq!(tx.executed, false);

    assert_eq!(wallet_by_id(WALLET1).unwrap().pending_tx_count, 1);
    assert_eq!(pending_tx_ids_by_wallet_id(WALLET1), vec![1]);
  });
}

#[test]
fn submit_transaction_should_fail_wallet_not_found() {
  with_externalities(&mut test_ext(), || {
    assert_noop!(_submit_default_transaction(), MSG_WALLET_NOT_FOUND);
  });
}

#[test]
fn submit_transaction_should_fail_not_a_wallet_owner() {
  with_externalities(&mut test_ext(), || {
    assert_ok!(_create_wallet(None, None, Some(vec![ACCOUNT1, ACCOUNT2]), None, None)); // WalletId: WALLET1
    deposit_wallet(WALLET1, 1000);

    assert_noop!(_submit_transaction(Some(Origin::signed(ACCOUNT3)), None, None, None, None), MSG_NOT_A_WALLET_OWNER);
  });
}

#[test]
fn submit_transaction_should_fail_too_big_tx_value() {
  with_externalities(&mut test_ext(), || {
    // Max allowed tx value for this wallet is 100
    assert_ok!(_create_default_wallet()); // WalletId: WALLET1
    deposit_wallet(WALLET1, 1000);

    assert_noop!(_submit_transaction(None, None, None, Some(200), None), MSG_TX_VALUE_GREATER_THAN_ALLOWED);
  });
}

#[test]
fn submit_transaction_should_fail_not_enough_money() {
  with_externalities(&mut test_ext(), || {
    assert_ok!(_create_default_wallet()); // WalletId: WALLET1
    deposit_wallet(WALLET1, 10);

    assert_noop!(_submit_default_transaction(), MSG_TX_VALUE_GREATER_THAN_BALANCE);
  });
}

// Confirm transaction tests

#[test]
fn confirm_transaction_should_work() {
  with_externalities(&mut test_ext(), || {
    assert_ok!(_create_wallet(None, None, None, None, Some(3))); // WalletId: WALLET1
    deposit_wallet(WALLET1, 1000);
    assert_ok!(_submit_default_transaction()); // TransactionId 1
    assert_ok!(_confirm_default_transaction()); // Confirm by ACCOUNT2

    // Check whether data was stored correcty
    let tx = tx_by_id(1).unwrap();
    assert_eq!(tx.confirmed_by, vec![ACCOUNT1, ACCOUNT2]);
    assert_eq!(tx.executed, false);

    assert_eq!(pending_tx_ids_by_wallet_id(WALLET1), vec![1]);
  });
}

#[test]
fn confirm_transaction_execute_should_work() {
  with_externalities(&mut test_ext(), || {
    assert_ok!(_create_default_wallet()); // WalletId: WALLET1
    deposit_wallet(WALLET1, 1000);
    assert_ok!(_submit_default_transaction()); // TransactionId 1
    assert_ok!(_confirm_default_transaction()); // Confirm by ACCOUNT2 and execute

    // Check whether data was stored correcty
    let tx = tx_by_id(1).unwrap();
    assert_eq!(tx.confirmed_by, vec![ACCOUNT1, ACCOUNT2]);
    assert_eq!(tx.executed, true);

    let wallet = wallet_by_id(WALLET1).unwrap();
    assert!(pending_tx_ids_by_wallet_id(WALLET1).is_empty());
    assert_eq!(wallet.pending_tx_count, 0);
    assert_eq!(executed_tx_ids_by_wallet_id(WALLET1), vec![1]);
    assert_eq!(wallet.executed_tx_count, 1);

    // Check whether money was transfered
    assert_eq!(Balances::free_balance(&ACCOUNT5), 50);
  });
}

#[test]
fn confirm_transaction_should_fail_wallet_not_found() {
  with_externalities(&mut test_ext(), || {
    assert_ok!(_create_default_wallet()); // WalletId: WALLET1
    deposit_wallet(WALLET1, 1000);
    assert_ok!(_submit_default_transaction()); // TransactionId 1
    assert_noop!(_confirm_transaction(None, Some(11), None), MSG_WALLET_NOT_FOUND);
  });
}

#[test]
fn confirm_transaction_should_fail_not_a_wallet_owner() {
  with_externalities(&mut test_ext(), || {
    assert_ok!(_create_default_wallet()); // WalletId: WALLET1
    deposit_wallet(WALLET1, 1000);
    assert_ok!(_submit_default_transaction()); // TransactionId 1
    assert_noop!(_confirm_transaction(Some(Origin::signed(ACCOUNT4)), None, None), MSG_NOT_A_WALLET_OWNER);
  });
}

#[test]
fn confirm_transaction_should_fail_transaction_not_found() {
  with_externalities(&mut test_ext(), || {
    assert_ok!(_create_default_wallet()); // WalletId: WALLET1
    deposit_wallet(WALLET1, 1000);
    assert_ok!(_submit_default_transaction()); // TransactionId 1
    assert_noop!(_confirm_transaction(None, None, Some(2)), MSG_TRANSACTION_NOT_FOUND);
  });
}

#[test]
fn confirm_transaction_should_fail_account_already_confirmed_tx() {
  with_externalities(&mut test_ext(), || {
    assert_ok!(_create_default_wallet()); // WalletId: WALLET1
    deposit_wallet(WALLET1, 1000);
    assert_ok!(_submit_default_transaction()); // TransactionId 1
    assert_noop!(_confirm_transaction(Some(Origin::signed(ACCOUNT1)), None, None), MSG_ACCOUNT_ALREADY_CONFIRMED_TX);
  });
}

#[test]
fn confirm_transaction_should_fail_tx_not_tie_to_wallet() {
  with_externalities(&mut test_ext(), || {
    assert_ok!(_create_wallet(
      Some(Origin::signed(ACCOUNT1)), 
      Some(WALLET1), 
      Some(vec![ACCOUNT1, ACCOUNT2]), 
      Some(100), 
      Some(2)
    ));
    deposit_wallet(WALLET1, 1000);
    assert_ok!(_create_wallet(
      Some(Origin::signed(ACCOUNT3)), 
      Some(WALLET2), 
      Some(vec![ACCOUNT3, ACCOUNT4]), 
      Some(100), 
      Some(2)
    ));
    deposit_wallet(WALLET2, 1000);

    assert_ok!(_submit_transaction(
      Some(Origin::signed(ACCOUNT2)), 
      Some(WALLET1), 
      Some(ACCOUNT5), 
      Some(10), 
      None
    ));
    assert_ok!(_submit_transaction(
      Some(Origin::signed(ACCOUNT4)), 
      Some(WALLET2), 
      Some(ACCOUNT5), 
      Some(10), 
      None
    ));

    assert_noop!(_confirm_transaction(
      Some(Origin::signed(ACCOUNT1)), 
      Some(WALLET1), 
      Some(2)
    ), MSG_TRANSACTION_NOT_TIED_TO_WALLET);
  });
}
