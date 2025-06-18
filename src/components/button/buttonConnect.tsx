"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MetaMaskIcon } from "@/components/icons/metamaskIcon";
import { ethers } from "ethers";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const ButtonConnectWallet = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      console.log("Connected address:", address);

      const res = await fetch(`/api/auth/nonce?address=${address}`);
      const { nonce } = await res.json();

      console.log(nonce);

      const message = `Login with nonce: ${nonce}`;
      const signature = await signer.signMessage(message);

      console.log("Signature:", signature);

      const response = await signIn("wallet", {
        address,
        signature,
        redirect: false,
      });
      console.log("Response from signIn:", response);
      if (!response) {
        console.log("Sign-in failed");
        setLoading(false);
      }

      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error("Login error", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-2">
      <Button variant="outline" onClick={login} disabled={loading}>
        <MetaMaskIcon />
        {loading ? "Loading..." : "Connect with MetaMask"}
      </Button>
    </div>
  );
};
