use crate::balances::balance_manager::Balances;
use ink::{
    prelude::{string::String, vec, vec::Vec},
    primitives::AccountId,
    storage::Mapping,
};

#[cfg(feature = "std")]
use ink::storage::traits::StorageLayout;

/// Type for a PSP34 token id.
/// Contains all the possible permutations of id according to the standard.
#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
pub enum Id {
    U8(u8),
    U16(u16),
    U32(u32),
    U64(u64),
    U128(u128),
    Bytes(Vec<u8>),
}

/// Temporary type for events emitted during operations that change the
/// state of PSP34Data struct.
/// This is meant to be replaced with proper ink! events as soon as the
/// language allows for event definitions outside contracts.
pub enum PSP34Event {
    Transfer {
        from: Option<AccountId>,
        to: Option<AccountId>,
        id: Id,
    },
    Approval {
        owner: AccountId,
        operator: AccountId,
        id: Option<Id>,
        approved: bool,
    },
    AttributeSet {
        id: Id,
        key: Vec<u8>,
        data: Vec<u8>,
    },
}

/// A class implementing the internal logic of a PSP34 token.
//
/// Holds the state of all account balances and approvals.
/// Each method of this class corresponds to one type of transaction
/// as defined in the PSP34 standard.
//
/// Since this code is outside of `ink::contract` macro, the caller's
/// address cannot be obtained automatically. Because of that, all
/// the methods that need to know the caller require an additional argument
/// (compared to transactions defined by the PSP34 standard or the PSP34 trait).
//
/// `lib.rs` contains an example implementation of a smart contract using this class.
#[ink::storage_item]
#[derive(Debug, Default)]
pub struct PSP34Data {
    token_owner: Mapping<Id, AccountId>,
    operator_approvals: Mapping<(AccountId, AccountId, Option<Id>), ()>,
    balance: Balances,
}

impl PSP34Data {
    /// Creates a token with default values for every field.
    /// Initially held by the 'creator' account.
    pub fn new() -> PSP34Data {
        Default::default()
    }

    pub fn total_supply(&self) -> u128 {
        self.balance.total_supply()
    }

    pub fn balance_of(&self, owner: AccountId) -> u32 {
        self.balance.balance_of(&owner)
    }

    pub fn owner_of(&self, id: &Id) -> Option<AccountId> {
        self.token_owner.get(id)
    }

    pub fn allowance(&self, owner: AccountId, operator: AccountId, id: Option<&Id>) -> bool {
        self.operator_approvals
            .get((owner, operator, &None))
            .is_some()
            || id.is_some() && self.operator_approvals.get((owner, operator, id)).is_some()
    }

    pub fn collection_id(&self, account_id: AccountId) -> Id {
        Id::Bytes(<_ as AsRef<[u8; 32]>>::as_ref(&account_id).to_vec())
    }

    /// Sets a new `approved` for a token `id` or for all tokens if no `id` is provided,
    /// granted by `caller` to `operator`.
    /// Overwrites the previously granted value.
    pub fn approve(
        &mut self,
        mut caller: AccountId,
        operator: AccountId,
        id: Option<Id>,
        approved: bool,
    ) -> Result<Vec<PSP34Event>, PSP34Error> {
        if let Some(id) = &id {
            let owner = self.owner_of(id).ok_or(PSP34Error::TokenNotExists)?;
            if approved && owner == operator {
                return Err(PSP34Error::SelfApprove);
            }

            if owner != caller && !self.allowance(owner, caller, None) {
                return Err(PSP34Error::NotApproved);
            }

            if !approved && self.allowance(owner, operator, None) {
                return Err(PSP34Error::Custom(String::from(
                    "Cannot revoke approval for a single token, when the operator has approval for all tokens."
                )));
            }
            caller = owner;
        }

        if approved {
            self.operator_approvals
                .insert((caller, operator, id.as_ref()), &());
        } else {
            self.operator_approvals
                .remove((caller, operator, id.as_ref()));
        }

        Ok(vec![PSP34Event::Approval {
            owner: caller,
            operator,
            id,
            approved,
        }])
    }

    /// Transfers `value` tokens from `caller` to `to`.
    pub fn transfer(
        &mut self,
        caller: AccountId,
        to: AccountId,
        id: Id,
        _data: Vec<u8>,
    ) -> Result<Vec<PSP34Event>, PSP34Error> {
        let owner = self.owner_of(&id).ok_or(PSP34Error::TokenNotExists)?;

        if owner == to {
            return Ok(vec![]);
        }

        if owner != caller && !self.allowance(owner, caller, Some(&id)) {
            return Err(PSP34Error::NotApproved);
        }

        self.balance.decrease_balance(&owner, &id, false);

        self.operator_approvals.remove((owner, caller, Some(&id)));
        self.token_owner.remove(&id);

        self.token_owner.insert(&id, &to);
        self.balance.increase_balance(&to, &id, false)?;

        Ok(vec![PSP34Event::Transfer {
            from: Some(caller),
            to: Some(to),
            id,
        }])
    }

    /// Mints a token `id` to `account`.
    pub fn mint(&mut self, account: AccountId, id: Id) -> Result<Vec<PSP34Event>, PSP34Error> {
        if self.owner_of(&id).is_some() {
            return Err(PSP34Error::TokenExists);
        }
        self.balance.increase_balance(&account, &id, true)?;
        self.token_owner.insert(&id, &account);

        Ok(vec![PSP34Event::Transfer {
            from: None,
            to: Some(account),
            id,
        }])
    }

    /// Burns token `id` from `account`, conducted by `caller`
    pub fn burn(
        &mut self,
        caller: AccountId,
        account: AccountId,
        id: Id,
    ) -> Result<Vec<PSP34Event>, PSP34Error> {
        if self.owner_of(&id).is_none() {
            return Err(PSP34Error::TokenNotExists);
        }
        if account != caller && !self.allowance(caller, account, None) {
            return Err(PSP34Error::NotApproved);
        }
        self.balance.decrease_balance(&account, &id, true);
        self.token_owner.remove(&id);

        Ok(vec![PSP34Event::Transfer {
            from: Some(account),
            to: None,
            id,
        }])
    }

    #[cfg(feature = "enumerable")]
    pub fn owners_token_by_index(&self, owner: AccountId, index: u128) -> Result<Id, PSP34Error> {
        self.balance.owners_token_by_index(owner, index)
    }

    #[cfg(feature = "enumerable")]
    pub fn token_by_index(&self, index: u128) -> Result<Id, PSP34Error> {
        self.balance.token_by_index(index)
    }
}

impl Default for Id {
    fn default() -> Self {
        Self::U128(0)
    }
}

impl From<Id> for u128 {
    fn from(id: Id) -> Self {
        match id {
            Id::U8(val) => val as u128,
            Id::U16(val) => val as u128,
            Id::U32(val) => val as u128,
            Id::U64(val) => val as u128,
            Id::U128(val) => val,
            Id::Bytes(val) => u128::from_be_bytes(val.as_slice().try_into().unwrap()),
        }
    }
}

#[ink::trait_definition]
pub trait PSP34 {
    /// Returns the collection `Id` of the NFT token.
    ///
    /// This can represents the relationship between tokens/contracts/pallets.
    #[ink(message)]
    fn collection_id(&self) -> Id;

    /// Returns the current total supply of the NFT.
    #[ink(message)]
    fn total_supply(&self) -> u128;

    /// Returns the account balance for the specified `owner`.
    ///
    /// This represents the amount of unique tokens the owner has.
    #[ink(message)]
    fn balance_of(&self, owner: AccountId) -> u32;

    /// Returns `true` if the operator is approved by the owner to withdraw `id` token.
    ///
    /// If `id` is `None`, returns `true` if the operator is approved to withdraw all owner's tokens.
    #[ink(message)]
    fn allowance(&self, owner: AccountId, operator: AccountId, id: Option<Id>) -> bool;

    /// Transfer approved or owned token from caller.
    ///
    /// On success a `Transfer` event is emitted.
    ///
    /// # Errors
    ///
    /// Returns `TokenNotExists` error if `id` does not exist.
    ///
    /// Returns `NotApproved` error if `from` doesn't have allowance for transferring.
    ///
    /// Returns `SafeTransferCheckFailed` error if `to` doesn't accept transfer.
    #[ink(message)]
    fn transfer(&mut self, to: AccountId, id: Id, data: Vec<u8>) -> Result<(), PSP34Error>;

    /// Approves `operator` to withdraw  the `id` token from the caller's account.
    /// If `id` is `None` approves or disapproves the operator for all tokens of the caller.
    ///
    /// An `Approval` event is emitted.
    ///
    /// # Errors
    ///
    /// Returns `SelfApprove` error if it is self approve.
    ///
    /// Returns `NotApproved` error if caller is not owner of `id`.
    #[ink(message)]
    fn approve(
        &mut self,
        operator: AccountId,
        id: Option<Id>,
        approved: bool,
    ) -> Result<(), PSP34Error>;

    /// Returns the owner of the token if any.
    #[ink(message)]
    fn owner_of(&self, id: Id) -> Option<AccountId>;
}

#[ink::trait_definition]
pub trait PSP34Metadata {
    /// Returns the attribute of `id` for the given `key`.
    ///
    /// If `id` is a collection id of the token, it returns attributes for collection.
    #[ink(message)]
    fn get_attribute(&self, id: Id, key: Vec<u8>) -> Option<Vec<u8>>;
}

#[ink::trait_definition]
pub trait PSP34Mintable {
    /// Mints a token to the sender's account.
    ///
    /// # Events
    ///
    /// On success a `Transfer` event is emitted with `None` sender.
    ///
    /// # Errors
    ///
    /// Reverts with `TokenExists`` if token id is already in the library.
    /// 
    /// Reverts with `Custom (max supply exceeded)` if the incremented by 1 total
    /// supply exceeds maximal value of `u128` type.
    #[ink(message)]
    fn mint(&mut self, id: Id) -> Result<(), PSP34Error>;
}

#[ink::trait_definition]
pub trait PSP34Burnable {
    /// Burns token from the selected account.
    ///
    /// # Events
    ///
    /// On success a `Transfer` event is emitted with `None` recipient.
    ///
    /// # Errors
    ///
    /// Reverts with `TokenExists` if token id is already in the library.
    #[ink(message)]
    fn burn(&mut self, account: AccountId, id: Id) -> Result<(), PSP34Error>;
}

#[cfg(feature = "enumerable")]
#[ink::trait_definition]
pub trait PSP34Enumerable {
    /// Returns a token `Id` owned by `owner` at a given `index` of its token list.
    /// Use along with `balance_of` to enumerate all of ``owner``'s tokens.
    #[ink(message)]
    fn owners_token_by_index(&self, owner: AccountId, index: u128) -> Result<Id, PSP34Error>;

    /// Returns a token `Id` at a given `index` of all the tokens stored by the contract.
    /// Use along with `total_supply` to enumerate all tokens.
    #[ink(message)]
    fn token_by_index(&self, index: u128) -> Result<Id, PSP34Error>;
}