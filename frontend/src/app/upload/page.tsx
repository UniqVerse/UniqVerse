"use client";
import { UploadForm } from "../components/uploadFile/UploadForm";
import { ConnectButton } from "../components/web3/connect-button";

export default function ServerUploadPage() {
  return (
    <main>
      <UploadForm />

      <ConnectButton />
    </main>
  )
}