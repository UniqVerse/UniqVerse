#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![allow(clippy::new_without_default)]

#[ink::contract]
mod marketplace {
    use ink::storage::Mapping;
    use psp34::{self, PSP34};

    // #[ink::storage_item]
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct PublishedNft {
        contract_address: AccountId,
        nft_address: psp34::Id,
    }

    /// Defines the storage of your contract.
    /// Add new fields to the below struct in order
    /// to add new static storage fields to your contract.
    #[ink(storage)]
    pub struct Marketplace {
        /// Mapping from user id to NFT id. Shows N aha i tak i to nam działa toFT owner.
        registered_nfts: Mapping<AccountId, PublishedNft>,
        /// Adding here nft to vecorize it
        vectorize_nft_queue: Mapping<AccountId, PublishedNft>,
        /// After the vectorization, it will be moved here
        vectorized_nfts: Mapping<AccountId, PublishedNft>,
        // registeredNfts: Mapping<AccountId, AccountId>,
    }

    impl Marketplace {
        /// Constructor that initializes the `bool` value to `false`.
        ///
        /// Constructors can delegate to other constructors.
        #[ink(constructor)]
        pub fn default() -> Self {
            Self {
                registered_nfts: Default::default(),
                vectorize_nft_queue: Default::default(),
                vectorized_nfts: Default::default(),
            }
        }

        #[ink(message)]
        pub fn add_nft_to_markerplace(&self, contract_id: AccountId, nft_id: psp34::Id) {
            let _caller = self.env().caller();
            let nft_contract: ink::contract_ref!(psp34::PSP34) = contract_id.into();

            let _nft = nft_contract.owner_of(nft_id);
            // if caller != nft
        }

        /// User publish an NFT in the queue and it will be vectorized.
        #[ink(message)]
        pub fn publish_to_vectorization(&self, _contract_id: AccountId, _nft_id: psp34::Id) {}

        #[ink(message)]
        pub fn report_vectorize_status(&self) {}
        /// Return 
        pub fn get_my_vector_queue(&self) {}
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// We test if the default constructor does its job.
        #[ink::test]
        fn default_works() {
            // let marketplace = Marketplace::default();
            // assert_eq!(marketplace.get(), false);
        }

        /// We test a simple use case of our contract.
        #[ink::test]
        fn it_works() {
            // let mut marketplace = Marketplace::new(false);
            // assert_eq!(marketplace.get(), false);
            // marketplace.flip();
            // assert_eq!(marketplace.get(), true);
        }
    }

    /// This is how you'd write end-to-end (E2E) or integration tests for ink! contracts.
    ///
    /// When running these you need to make sure that you:
    /// - Compile the tests with the `e2e-tests` feature flag enabled (`--features e2e-tests`)
    /// - Are running a Substrate node which contains `pallet-contracts` in the background
    #[cfg(all(test, feature = "e2e-tests"))]
    mod e2e_tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// A helper function used for calling contract messages.
        use ink_e2e::build_message;

        /// The End-to-End test `Result` type.
        type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

        /// We test that we can upload and instantiate the contract using its default constructor.
        #[ink_e2e::test]
        async fn default_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let constructor = MarketplaceRef::default();

            // When
            let contract_account_id = client
                .instantiate("marketplace", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Then
            let get = build_message::<MarketplaceRef>(contract_account_id.clone())
                .call(|marketplace| marketplace.get());
            let get_result = client.call_dry_run(&ink_e2e::alice(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), false));

            Ok(())
        }

        /// We test that we can read and write a value from the on-chain contract contract.
        #[ink_e2e::test]
        async fn it_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let constructor = MarketplaceRef::new(false);
            let contract_account_id = client
                .instantiate("marketplace", &ink_e2e::bob(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            let get = build_message::<MarketplaceRef>(contract_account_id.clone())
                .call(|marketplace| marketplace.get());
            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), false));

            // When
            let flip = build_message::<MarketplaceRef>(contract_account_id.clone())
                .call(|marketplace| marketplace.flip());
            let _flip_result = client
                .call(&ink_e2e::bob(), flip, 0, None)
                .await
                .expect("flip failed");

            // Then
            let get = build_message::<MarketplaceRef>(contract_account_id.clone())
                .call(|marketplace| marketplace.get());
            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), true));

            Ok(())
        }
    }
}
