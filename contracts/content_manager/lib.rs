#![cfg_attr(not(feature = "std"), no_std, no_main)]


#[ink::contract]
mod content_manager {
    use psp34::*;
    use nft::TokenRef;
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct ContentManager {
        nft_contract_hash: Hash,
        registered_nfts: Mapping<Id, i32>,
        collection_count: u64,
    }

    impl ContentManager {
        /// Constructor that initializes the `bool` value to the given `init_value`.
        #[ink(constructor)]
        pub fn new(nft_contract_hash: Hash) -> Self {
            Self { nft_contract_hash, registered_nfts: Default::default(), collection_count: Default::default() }
        }

        /// Constructor that initializes the `bool` value to `false`.
        ///
        /// Constructors can delegate to other constructors.
        #[ink(constructor)]
        pub fn default() -> Self {
            Self::new(Default::default())
        }

        /// Simply returns the current value of our `bool`.
        #[ink(message)]
        pub fn get_nft_contract_hash(&self) -> Hash {
            self.nft_contract_hash
        }

        #[ink(message)]
        pub fn create_and_register_nft(&mut self) -> AccountId {
            let contract = TokenRef::new()
                .endowment(0)
                .code_hash(self.nft_contract_hash)
                .salt_bytes(self.collection_count.to_le_bytes())
                .instantiate();
            let contract_account: AccountId = contract.to_account_id();
            contract_account
        }
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        // use core::ptr::null;

        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// We test if the default constructor does its job.
        #[ink::test]
        fn default_works() {
            let content_manager = ContentManager::default();
            assert_eq!(content_manager.get_nft_contract_hash(), Default::default());
        }

        // /// We test a simple use case of our contract.
        // #[ink::test]
        // fn it_works() {
        //     let mut content_manager = ContentManager::new(Hash());
        //     assert_eq!(content_manager.get(), false);
        //     content_manager.flip();
        //     assert_eq!(content_manager.get(), true);
        // }
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
        use nft::Token;

        /// A helper function used for calling contract messages.
        use ink_e2e::{build_message, subxt::book::setup::client};

        /// The End-to-End test `Result` type.
        type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

        /// We test that we can upload and instantiate the contract using its default constructor.
        // #[ink_e2e::test]
        // async fn default_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
        //     // Given
        //     let constructor = ContentManagerRef::default();

        //     // When
        //     let contract_account_id = client
        //         .instantiate("content_manager", &ink_e2e::alice(), constructor, 0, None)
        //         .await
        //         .expect("instantiate failed")
        //         .account_id;

        //     // Then
        //     let get = build_message::<ContentManagerRef>(contract_account_id.clone())
        //         .call(|content_manager| content_manager.get());
        //     let get_result = client.call_dry_run(&ink_e2e::alice(), &get, 0, None).await;
        //     assert!(matches!(get_result.return_value(), false));

        //     Ok(())
        // }

        // #[ink_e2e::test]
        // async fn it_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
        //     // Given
        //     let constructor = ContentManagerRef::new(false);
        //     let contract_account_id = client
        //         .instantiate("content_manager", &ink_e2e::bob(), constructor, 0, None)
        //         .await
        //         .expect("instantiate failed")
        //         .account_id;

        //     let get = build_message::<ContentManagerRef>(contract_account_id.clone())
        //         .call(|content_manager| content_manager.get());
        //     let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
        //     assert!(matches!(get_result.return_value(), false));

        //     // When
        //     let flip = build_message::<ContentManagerRef>(contract_account_id.clone())
        //         .call(|content_manager| content_manager.flip());
        //     let _flip_result = client
        //         .call(&ink_e2e::bob(), flip, 0, None)
        //         .await
        //         .expect("flip failed");

        //     // Then
        //     let get = build_message::<ContentManagerRef>(contract_account_id.clone())
        //         .call(|content_manager| content_manager.get());
        //     let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
        //     assert!(matches!(get_result.return_value(), true));

        //     Ok(())
        // }
        #[ink_e2e::test]
        async fn it_mints_nft(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let nft = TokenRef::new();
            

            let nftInited = client.instantiate("nft", &ink_e2e::alice(), nft, 0, None).await.expect("instantiate failed");
            // println!("{}", nftInited);
            // let hash = nftInited.code_hash;
            
            // let constructor = ContentManagerRef::new(hash);
            // let contract_account_id = client
            //     .instantiate("content_manager", &ink_e2e::bob(), constructor, 0, None)
            //     .await
            //     .expect("instantiate failed")
            //     .account_id;

            // let get = build_message::<ContentManagerRef>(contract_account_id.clone())
            //     .call(|content_manager| content_manager.get());
            // let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            // assert!(matches!(get_result.return_value(), false));

            // When
            // let flip = build_message::<ContentManagerRef>(contract_account_id.clone())
            //     .call(|content_manager| content_manager.create_and_register_nft());
            // let _flip_result = client
            //     .call(&ink_e2e::bob(), flip, 0, None)
            //     .await
            //     .expect("flip failed");

            // Then
            // let get = build_message::<ContentManagerRef>(contract_account_id.clone())
            //     .call(|content_manager| content_manager.get());
            // let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            // assert!(matches!(get_result.return_value(), true));

            Ok(())
        }
    }
}
