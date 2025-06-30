"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MetaMaskIcon } from "@/components/icons/metamaskIcon";
import { ethers } from "ethers";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

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

      const res = await fetch(`/api/auth/nonce?address=${address}`);
      const { nonce } = await res.json();

      const message = `Login with nonce: ${nonce}`;
      const signature = await signer.signMessage(message);

      const response = await signIn("authorize", {
        address,
        signature,
        redirect: false,
        callbackUrl: "/",
      });
      
      if (response?.ok && response.url) {
        router.push(response.url);
      } else {
        console.error("Sign-in failed", response?.error);
        setLoading(false);
      }

      setLoading(false);
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
