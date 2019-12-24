#![cfg(test)]

pub use super::wallet;
pub use support::traits::Currency;
pub use system;

pub use primitives::{H256, Blake2Hasher};
pub use runtime_primitives::{
  BuildStorage,
  traits::{BlakeTwo256, IdentityLookup},
  testing::{Digest, DigestItem, Header}
};

use support::impl_outer_origin;

impl_outer_origin! {
  pub enum Origin for Test {}
}

pub type AccountId = u64;
pub type TransactionId = u64;
pub type BalanceOf = u32;

#[derive(Clone, Eq, PartialEq, Debug)]
pub struct Test;
impl system::Trait for Test {
  type Origin = Origin;
  type Index = u64;
  type BlockNumber = u64;
  type Hash = H256;
  type Hashing = BlakeTwo256;
  type Digest = Digest;
  type AccountId = u64;
  type Lookup = IdentityLookup<Self::AccountId>;
  type Header = Header;
  type Event = ();
  type Log = DigestItem;
}

impl timestamp::Trait for Test {
  type Moment = u64;
  type OnTimestampSet = ();
}

impl balances::Trait for Test {
    type Event = ();
    type Balance = u32;
    type OnFreeBalanceZero = ();
    type OnNewAccount = ();
    type TransactionPayment = ();
    type DustRemoval = ();
    type TransferPayment = ();
}

impl wallet::Trait for Test {
  type Event = ();
  type TransactionId = u64;
  type Currency = balances::Module<Self>;
}

pub type MultisigWallet = wallet::Module<Test>;
pub type Balances = balances::Module<Test>;

pub fn test_ext() -> runtime_io::TestExternalities<Blake2Hasher> {
  system::GenesisConfig::<Test>::default()
    .build_storage()
    .unwrap()
    .0
    .into()
}
