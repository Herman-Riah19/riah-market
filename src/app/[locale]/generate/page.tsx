"use client";

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ethers, Contract } from "ethers";
import MyNFT from "artifacts/contracts/nft_mining.sol/MyNFT.json"
import { ImageDown } from "lucide-react";

const CONTRACT_ADDRESS = "0xYourContractAddressHere"; // Replace with your contract address

const PageGenerate = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [minting, setMinting] = useState(false);
  // const { account } = useSDK();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
  };

  const uploadAndMint = async () => {
    if (!selectedImage) return alert("Please select an image.");
    // if (!account) return alert("Please connect your wallet.");
    setMinting(true);

    try {
      // Upload to Pinata
      const data = new FormData()
      data.set("file", selectedImage);
      const request = await fetch("/api/pinata", {
        method: "POST",
        body: data,
      });
      const pinataResponse = await request.json();
      console.log(pinataResponse.IpfsHash);
      setImageUrl(pinataResponse.IpfsHash as string);

      const account = CONTRACT_ADDRESS;

      // const provider = new Web3Provider(window.ethereum);
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();
      // const contract = new Contract(CONTRACT_ADDRESS, MyNFT.abi, signer);
      // const tx = await contract.mintNFT(account, pinataResponse.IpfsHash);
      // await tx.wait();
      alert("NFT Minted Successfully!");
    } catch (error) {
      console.error("Minting error:", error);
      alert("Minting failed.");
    }
    setMinting(false);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Mint Your NFT</h1>
      <div className="grid gap-3">
      <Button
        style={{ backgroundImage: `url(${selectedImage && URL.createObjectURL(selectedImage)})`, border: 'dashed 2px #05043D' }}
        className="w-[500px] h-[425px] bg-transparent hover:bg-secondary/50 text-primary bg-no-repeat bg-cover bg-center relative">
        <Input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" style={{ position: 'absolute', opacity: 0, justifyContent: 'center' }} />
        {!selectedImage && <ImageDown />}
      </Button>
      </div>
      <Button onClick={uploadAndMint} disabled={minting}>
        {minting ? "Minting..." : "Mint as NFT"}
      </Button>
      {imageUrl && (
        <div className="mt-4">
          <p>NFT URL:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {imageUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default PageGenerate;