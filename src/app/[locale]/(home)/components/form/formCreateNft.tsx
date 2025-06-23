"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ethers, Contract } from "ethers";
import MyNFT from "artifacts/contracts/nft_mining.sol/MyNFT.json";
import { ImageDown } from "lucide-react";
import { uploadToPinata } from "@/services/ServicePinata";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CONTRACT_ADDRESS = "0xYourContractAddressHere";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
});

type FormValues = z.infer<typeof formSchema>;

export interface IFormCreateNftProps {
  selectedImage?: File | null;
  setSelectedImage?: (image: File | null) => void;
}

export function FormCreateNft({
  selectedImage,
  setSelectedImage,
}: IFormCreateNftProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [minting, setMinting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (setSelectedImage) {
      setSelectedImage(file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!selectedImage) return alert("Please select an image.");
    // if (!account) return alert("Please connect your wallet.");
    setMinting(true);

    try {
      // Upload to Pinata
      const fileData = new FormData();
      fileData.set("file", selectedImage);

      console.log("data: ", data);

      const pinataResponse = await uploadToPinata(fileData);
      if (pinataResponse instanceof Error) {
        throw pinataResponse;
      }
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
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New NFT</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-3">
              <Button
                style={{
                  backgroundImage: `url(${
                    selectedImage && URL.createObjectURL(selectedImage)
                  })`,
                  border: "dashed 2px #05043D",
                }}
                className="w-[500px] h-[425px] bg-transparent hover:bg-secondary/50 text-primary bg-no-repeat bg-contain bg-center relative"
              >
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    justifyContent: "center",
                  }}
                />
                {!selectedImage && <ImageDown />}
              </Button>
            </div>

            {imageUrl && (
              <div className="mt-4">
                <p>NFT URL:</p>
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {imageUrl}
                </a>
              </div>
            )}
            <Input type="text" placeholder="NFT Title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
            <Textarea placeholder="Description" {...register("description")} />
            <Input
              type="number"
              placeholder="Price (ETH)"
              {...register("price")}
            />
            <Button type="submit" disabled={minting} className="w-full">
              {minting ? "Minting..." : "Create and Mint NFT"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
