"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MetaMaskIcon } from "@/components/icons/metamaskIcon";
import { ethers } from "ethers";
import { putUserAdress } from "@/services/serviceUser";
import { useUserAddress } from "@/hooks/useUserAdress";
import { useShallow } from "zustand/react/shallow";

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const ButtonConnectWallet = () => {
  const [loading, setLoading] = useState(false);
  const { setTokens, address } = useUserAddress(
    useShallow((state) => ({
      setTokens: state.setTokens,
      address: state.address,
    }))
  );

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

      const response = await putUserAdress(address, signature);
      console.log('Response connect: ', response);

      if(!response) throw new Error("Response is empty")
      setTokens(response?.address, response?.signature)

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