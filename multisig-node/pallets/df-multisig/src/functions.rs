use super::*;

use frame_support::{dispatch::DispatchResult};
use frame_support::traits::ExistenceRequirement;

impl<T: Trait> Module<T> {
  pub fn vec_remove_on<F: PartialEq>(vector: &mut Vec<F>, element: F) {
    if let Some(index) = vector.iter().position(|x| *x == element) {
      vector.swap_remove(index);
    }
  }

  pub fn new_change(account: T::AccountId) -> Change<T> {
    Change {
      account,
      block: <system::Module<T>>::block_number(),
      time: <pallet_timestamp::Module<T>>::now(),
    }
  }

  pub fn execute_transaction(executer: T::AccountId, mut wallet: Wallet<T>, mut transaction: Transaction<T>) -> DispatchResult {
    let wallet_id = wallet.id.clone();
    let tx_id = transaction.id;

    ensure!(transaction.confirmed_by.len() == wallet.confirms_required as usize, MSG_NOT_ENOUGH_CONFIRMS_ON_TX);
    ensure!(transaction.value <= T::Currency::free_balance(&wallet_id), MSG_FREE_BALANCE_TOO_LOW);

    T::Currency::transfer(&wallet_id, &transaction.destination, transaction.value, ExistenceRequirement::KeepAlive)?;
    transaction.executed = true;

    wallet.pending_tx_count = wallet.pending_tx_count.checked_sub(1).ok_or(MSG_UNDERFLOW_EXECUTING_TX)?;
    wallet.executed_tx_count = wallet.executed_tx_count.checked_add(1).ok_or(MSG_OVERFLOW_EXECUTING_TX)?;

    Self::change_tx_from_pending_to_executed(wallet_id.clone(), tx_id)?;

    <WalletById<T>>::insert(wallet_id.clone(), wallet);
    <TxById<T>>::insert(tx_id, transaction);
    Self::deposit_event(RawEvent::TransactionExecuted(executer, wallet_id, tx_id));

    Ok(())
  }

  pub fn change_tx_from_pending_to_executed(wallet_id: T::AccountId, tx_id: TransactionId) -> DispatchResult {
    ensure!(Self::wallet_by_id(wallet_id.clone()).is_some(), MSG_WALLET_NOT_FOUND);
    ensure!(Self::tx_by_id(tx_id).is_some(), MSG_TRANSACTION_NOT_FOUND);
    ensure!(!Self::executed_tx_ids_by_wallet_id(wallet_id.clone()).iter().any(|&x| x == tx_id), MSG_TX_ALREADY_EXECUTED);

    <PendingTxIdsByWalletId<T>>::mutate(wallet_id.clone(), |txs| Self::vec_remove_on(txs, tx_id));
    <ExecutedTxIdsByWalletId<T>>::mutate(wallet_id.clone(), |ids| ids.push(tx_id));

    Ok(())
  }
}