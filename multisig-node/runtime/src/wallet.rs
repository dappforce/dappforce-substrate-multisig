use rstd::prelude::*;
use support::{decl_module, decl_storage, decl_event, StorageValue, StorageMap, ensure, dispatch::Result, Parameter};
use support::traits::{Currency, LockableCurrency, ReservableCurrency};
use parity_codec::{Encode, Decode, Codec};
use runtime_primitives::traits::{As, Member, SimpleArithmetic, MaybeDebug, MaybeSerializeDebug};
use rstd::collections::btree_map::BTreeMap;
// use primitives::{sr25519, crypto::Pair};
use {timestamp};
use system::{self, ensure_signed};

pub const MIN_WALLET_MAX_TX_VALUE: u16 = 1;
pub const MIN_WALLET_OWNERS: u16 = 2;
pub const MAX_WALLET_OWNERS: u16 = 16;
pub const MAX_TRANSACTION_NOTES_LEN: u16 = 256;

pub const MSG_NOT_ENOUGH_OWNERS: &str = "There can not be less owners than allowed";
pub const MSG_TOO_MANY_OWNERS: &str = "There can not be more owners than allowed";
pub const MSG_CONFIRMS_NUMBER_EXCEEDS_OWNERS: &str = "The required confirmation count can not be greater than owners count";
pub const MSG_CANNOT_REQUIRE_ZERO_CONFIRMS: &str = "The required confirmation count can not be less than 1";
pub const MSG_WALLET_NOT_FOUND: &str = "Multi-signature wallet not found by id";
pub const MSG_NOT_A_WALLET_OWNER: &str = "Account is not a wallet owner";
pub const MSG_TX_NOTES_GREATER_THAN_ALLOWED: &str = "Transaction notes are too long";
pub const MSG_TRANSACTION_NOT_FOUND: &str = "Transaction not found in a wallet";
pub const MSG_TX_VALUE_GREATER_THAN_ALLOWED: &str = "Transaction value is greater than allowed";
pub const MSG_TX_VALUE_GREATER_THAN_BALANCE: &str = "Transaction value is greater than a wallet balance";
pub const MSG_ACCOUNT_ALREADY_CONFIRMED_TX: &str = "Account has already confirmed this transaction";
pub const MSG_NOT_ENOUGH_CONFIRMS_ON_TX: &str = "There are not enough confirmations on a transaction";
pub const MSG_FREE_BALANCE_TOO_LOW: &str = "Wallet's free balance is lower than a transaction value";
pub const MSG_TX_ALREADY_EXECUTED: &str = "Transaction is already executed";
// pub const MSG_NO_TXS_ON_WALLET: &str = "There are no transactions on wallet yet";
pub const MSG_TRANSACTION_NOT_TIED_TO_WALLET: &str = "Transaction is not tied to an owed wallet";
pub const MSG_MAX_TX_VALUE_LOWER_THAN_ALLOWED: &str = "Wallet max tx value cannot be lower than allowed";
pub const MSG_OVERFLOW_SUBMITTING_TX: &str = "Overflow in Wallet pending tx counter when submitting tx";
pub const MSG_UNDERFLOW_EXECUTING_TX: &str = "Underflow in Wallet pending tx counter when executing tx";
pub const MSG_OVERFLOW_EXECUTING_TX: &str = "Overflow in Wallet executed tx counter when executing tx";

#[cfg_attr(feature = "std", derive(Debug))]
#[derive(Clone, Encode, Decode)]
pub struct Change<T: Trait> {
	pub account: T::AccountId,
	block: T::BlockNumber,
	time: T::Moment,
}

#[cfg_attr(feature = "std", derive(Debug))]
#[derive(Clone, Encode, Decode)]
pub struct Wallet<T: Trait> {
	pub created: Change<T>,
	pub id: T::AccountId,
	pub owners: Vec<T::AccountId>,
	pub max_tx_value: BalanceOf<T>,
	pub confirms_required: u16,

	pub pending_tx_count: u16,
	pub executed_tx_count: u64,
}

#[cfg_attr(feature = "std", derive(Debug))]
#[derive(Clone, Encode, Decode)]
pub struct Transaction<T: Trait> {
	pub created: Change<T>,
	pub id: T::TransactionId,
	pub destination: T::AccountId,
	pub value: BalanceOf<T>,
	pub notes: Vec<u8>,
	pub confirmed_by: Vec<T::AccountId>,
	pub executed: bool,
}

pub type BalanceOf<T> =
	<<T as Trait>::Currency as Currency<<T as system::Trait>::AccountId>>::Balance;

pub trait Trait: system::Trait + timestamp::Trait + MaybeDebug {
	type Event: From<Event<Self>> + Into<<Self as system::Trait>::Event>;
	type TransactionId: Parameter + Member + SimpleArithmetic + Codec + Default + Copy + As<usize>
			+ As<u64> + MaybeSerializeDebug + PartialEq;
	type Currency: Currency<Self::AccountId> + ReservableCurrency<Self::AccountId>
			+ LockableCurrency<Self::AccountId, Moment = Self::BlockNumber>;
}

decl_storage! {
	trait Store for Module<T: Trait> as MultisigWalletModule {
		MinMultisigWalletMaxTxValue get(min_wallet_max_tx_value): u16 = MIN_WALLET_MAX_TX_VALUE;
		MinMultisigWalletOwners get(min_wallet_owners): u16 = MIN_WALLET_OWNERS;
		MaxMultisigWalletOwners get(max_wallet_owners): u16 = MAX_WALLET_OWNERS;
		MaxTransactionNotesLen get(max_transaction_notes_len): u16 = MAX_TRANSACTION_NOTES_LEN;

		WalletById get(wallet_by_id): map T::AccountId => Option<Wallet<T>>;
		WalletIdsByAccountId get(wallet_ids_by_account_id): map T::AccountId => Vec<T::AccountId>;

		TxById get(tx_by_id): map T::TransactionId => Option<Transaction<T>>;
		PendingTxIdsByWalletId get(pending_tx_ids_by_wallet_id): map T::AccountId => Vec<T::TransactionId>;
		ExecutedTxIdsByWalletId get(executed_tx_ids_by_wallet_id): map T::AccountId => Vec<T::TransactionId>;
    NextTxId get(next_tx_id): T::TransactionId = T::TransactionId::sa(1);
	}
}

decl_module! {
	pub struct Module<T: Trait> for enum Call where origin: T::Origin {
		fn deposit_event<T>() = default;

		pub fn create_wallet(origin, wallet_id: T::AccountId, owners: Vec<T::AccountId>,
			max_tx_value: BalanceOf<T>, confirms_required: u16) -> Result
		{
			let creator = ensure_signed(origin)?;
			let mut owners_map: BTreeMap<T::AccountId, bool> = BTreeMap::new();
			let mut wallet_owners: Vec<T::AccountId> = vec![];

			for owner in owners.iter() {
				if !owners_map.contains_key(&owner) {
					owners_map.insert(owner.clone(), true);
					wallet_owners.push(owner.clone());
				}
			}

			let owners_count = wallet_owners.len() as u16;
			ensure!(owners_count >= MIN_WALLET_OWNERS, MSG_NOT_ENOUGH_OWNERS);
			ensure!(owners_count <= MAX_WALLET_OWNERS, MSG_TOO_MANY_OWNERS);

			ensure!(confirms_required <= owners_count, MSG_CONFIRMS_NUMBER_EXCEEDS_OWNERS);
			ensure!(confirms_required > 0, MSG_CANNOT_REQUIRE_ZERO_CONFIRMS);
			ensure!(max_tx_value >= BalanceOf::<T>::sa(MIN_WALLET_MAX_TX_VALUE as u64), MSG_MAX_TX_VALUE_LOWER_THAN_ALLOWED);

			// let public_key: sr25519::Public = sr25519::Pair::generate().public();
			// let wallet_id: T::AccountId = public_key.using_encoded(Decode::decode).expect("panic!");
			let new_wallet = Wallet {
				created: Self::new_change(creator.clone()),
				id: wallet_id.clone(),
				owners: wallet_owners.clone(),
				max_tx_value,
				confirms_required,
				pending_tx_count: 0,
				executed_tx_count: 0
			};

			<WalletById<T>>::insert(wallet_id.clone(), new_wallet);

			for owner in wallet_owners.iter() {
				<WalletIdsByAccountId<T>>::mutate(owner.clone(), |ids| ids.push(wallet_id.clone()));
			}

			Self::deposit_event(RawEvent::WalletCreated(creator, wallet_id));

			Ok(())
		}

		pub fn submit_transaction(origin, wallet_id: T::AccountId, destination: T::AccountId,
			value: BalanceOf<T>, notes: Vec<u8>) -> Result
		{
			let sender = ensure_signed(origin)?;

			ensure!(notes.len() <= MAX_TRANSACTION_NOTES_LEN as usize, MSG_TX_NOTES_GREATER_THAN_ALLOWED);

			let mut wallet = Self::wallet_by_id(wallet_id.clone()).ok_or(MSG_WALLET_NOT_FOUND)?;
			wallet.pending_tx_count = wallet.pending_tx_count.checked_add(1).ok_or(MSG_OVERFLOW_SUBMITTING_TX)?;

			let is_wallet_owner = wallet.owners.iter().any(|owner| *owner == sender.clone());
			ensure!(is_wallet_owner, MSG_NOT_A_WALLET_OWNER);

			ensure!(value <= wallet.max_tx_value, MSG_TX_VALUE_GREATER_THAN_ALLOWED);
			ensure!(value <= T::Currency::free_balance(&wallet_id), MSG_TX_VALUE_GREATER_THAN_BALANCE);

			let transaction_id = Self::next_tx_id();
			let ref mut new_transaction = Transaction {
				created: Self::new_change(sender.clone()),
				id: transaction_id,
				destination,
				value,
				notes,
				confirmed_by: vec![],
				executed: false
			};

			new_transaction.confirmed_by.push(sender.clone());

			<WalletById<T>>::insert(wallet_id.clone(), wallet);
			<TxById<T>>::insert(transaction_id, new_transaction);
			<PendingTxIdsByWalletId<T>>::mutate(wallet_id.clone(), |ids| ids.push(transaction_id));
			<NextTxId<T>>::mutate(|n| { *n += T::TransactionId::sa(1); });

			Self::deposit_event(RawEvent::TransactionSubmitted(sender, wallet_id, transaction_id));

			Ok(())
		}

		pub fn confirm_transaction(origin, wallet_id: T::AccountId, tx_id: T::TransactionId) -> Result {
			let sender = ensure_signed(origin)?;

			let wallet = Self::wallet_by_id(wallet_id.clone()).ok_or(MSG_WALLET_NOT_FOUND)?;
			
			let is_wallet_owner = wallet.owners.iter().any(|owner| *owner == sender.clone());
			ensure!(is_wallet_owner, MSG_NOT_A_WALLET_OWNER);

			let mut transaction = Self::tx_by_id(tx_id).ok_or(MSG_TRANSACTION_NOT_FOUND)?;

			let transaction_list = Self::pending_tx_ids_by_wallet_id(wallet_id.clone());
			ensure!(transaction_list.iter().any(|ids| *ids == tx_id), MSG_TRANSACTION_NOT_TIED_TO_WALLET);

			let sender_not_confirmed_yet = !transaction.confirmed_by.iter().any(|account| *account == sender.clone());
			ensure!(sender_not_confirmed_yet, MSG_ACCOUNT_ALREADY_CONFIRMED_TX);

			transaction.confirmed_by.push(sender.clone());

			if transaction.confirmed_by.len() == wallet.confirms_required as usize {
				Self::execute_transaction(sender.clone(), wallet.clone(), transaction.clone())?;
			} else {
				<TxById<T>>::insert(tx_id, transaction);
			}

			Self::deposit_event(RawEvent::TransactionSubmitted(sender, wallet_id, tx_id));

			Ok(())
		}
	}
}

decl_event!(
	pub enum Event<T> where
		<T as system::Trait>::AccountId,
		<T as Trait>::TransactionId
	{
		WalletCreated(AccountId, AccountId),
		TransactionSubmitted(AccountId, AccountId, TransactionId),
		TransactionExecuted(AccountId, AccountId, TransactionId),
	}
);

impl<T: Trait> Module<T> {
	fn vec_remove_on<F: PartialEq>(vector: &mut Vec<F>, element: F) {
    if let Some(index) = vector.iter().position(|x| *x == element) {
      vector.swap_remove(index);
    }
  }

	fn new_change(account: T::AccountId) -> Change<T> {
    Change {
      account,
      block: <system::Module<T>>::block_number(),
      time: <timestamp::Module<T>>::now(),
    }
  }

	fn execute_transaction(executer: T::AccountId, mut wallet: Wallet<T>, mut transaction: Transaction<T>) -> Result {
		let wallet_id = wallet.id.clone();
		let tx_id = transaction.id;

		ensure!(transaction.confirmed_by.len() == wallet.confirms_required as usize, MSG_NOT_ENOUGH_CONFIRMS_ON_TX);
		ensure!(transaction.value <= T::Currency::free_balance(&wallet_id), MSG_FREE_BALANCE_TOO_LOW);

		T::Currency::transfer(&wallet_id, &transaction.destination, transaction.value)?;
		transaction.executed = true;

		wallet.pending_tx_count = wallet.pending_tx_count.checked_sub(1).ok_or(MSG_UNDERFLOW_EXECUTING_TX)?;
		wallet.executed_tx_count = wallet.executed_tx_count.checked_add(1).ok_or(MSG_OVERFLOW_EXECUTING_TX)?;

		Self::change_tx_from_pending_to_executed(wallet_id.clone(), tx_id)?;

		<WalletById<T>>::insert(wallet_id.clone(), wallet);
		<TxById<T>>::insert(tx_id, transaction);
		Self::deposit_event(RawEvent::TransactionExecuted(executer, wallet_id, tx_id));

		Ok(())
	}

	fn change_tx_from_pending_to_executed(wallet_id: T::AccountId, tx_id: T::TransactionId) -> Result {
		ensure!(Self::wallet_by_id(wallet_id.clone()).is_some(), MSG_WALLET_NOT_FOUND);
		ensure!(Self::tx_by_id(tx_id).is_some(), MSG_TRANSACTION_NOT_FOUND);
		ensure!(!Self::executed_tx_ids_by_wallet_id(wallet_id.clone()).iter().any(|&x| x == tx_id), MSG_TX_ALREADY_EXECUTED);

		<PendingTxIdsByWalletId<T>>::mutate(wallet_id.clone(), |txs| Self::vec_remove_on(txs, tx_id));
		<ExecutedTxIdsByWalletId<T>>::mutate(wallet_id.clone(), |ids| ids.push(tx_id));

		Ok(())
	}
}
