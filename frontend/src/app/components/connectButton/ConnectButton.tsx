"use client";
import {web3Enable} from "@polkadot/extension-dapp";
import {useEffect, useState} from "react";
import {web3Accounts} from "@polkadot/extension-dapp/bundle";
import {InjectedAccount} from "@polkadot/extension-inject/types";

export default function ConnectButton() {
    type InjectedExtension = Awaited<ReturnType<typeof web3Enable>>[number];

    const [extensions, setExtensions] = useState<InjectedExtension[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<InjectedAccount>()
    useEffect(() => {
        if (extensions.length > 0) return
        web3Enable("UniqVerse").then(
            value => setExtensions(value)
        )
        // web3Accounts().then(
        //     value => console.log(value)
        // )
    })
    useEffect(() => {
        extensions?.[0]?.accounts?.get().then((accs) => {
            setSelectedAccount(accs[0])
        })
    }, [extensions]);

    const loadAccountsFromExtensions = async () => {
        // extension-dapp API: connect to extensions; returns list of injected extensions
        const injectedExtensions = await web3Enable("UniqVerse");

        console.log(injectedExtensions)
        setExtensions(injectedExtensions);
    };
    return (
        <div className={"text-center"}>
            {
                extensions.length < 1 ?
                    <button onClick={loadAccountsFromExtensions}>
                        Connect to extensions
                    </button>
                    :
                    <div>
                        <span>{selectedAccount?.name}</span>
                    </div>
            }
        </div>
    )
}
