import Image from "next/image";

import { ConnectButton } from '@/src/components/web3/connect-button'

export default function Home() {
  return (
  <>
    {/* Connect Wallet Button */}
    <ConnectButton />

    <p>Hello, World!</p>
    </>
  )
}
