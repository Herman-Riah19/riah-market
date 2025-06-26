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
import { LabelledTextField } from "@/components/form/labelledTextFiled";
import { createProductSchema } from "@/validators/product-schema";
import { saveProduct } from "@/services/serviceProduct";
import { useToast } from "@/hooks/useToast";

type FormValues = z.infer<typeof createProductSchema>;

export interface IFormCreateNftProps {
  selectedImage?: File | null;
  setSelectedImage?: (image: File | null) => void;
}

export function FormCreateNft({
  selectedImage,
  setSelectedImage,
}: IFormCreateNftProps) {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState("");
  const [minting, setMinting] = useState(false);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createProductSchema),
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
    setMinting(true);

    try {
      // Upload to Pinata
      const fileData = new FormData();
      fileData.set("file", selectedImage);

      const pinataResponse = await uploadToPinata(fileData);
      if (pinataResponse instanceof Error) {
        throw pinataResponse;
      }
      console.log(pinataResponse.IpfsHash);
      setImageUrl(pinataResponse.IpfsHash as string);

      const response = await saveProduct({
        title: data.title,
        image: pinataResponse.IpfsHash as string,
        price: parseFloat(data.price.toString()),
        description: data.description ?? undefined,
        owner: data.owner,
      });

      if (response.success === false) {
        throw new Error(
          typeof response.error === "string"
            ? response.error
            : response.error instanceof Error
            ? response.error.message
            : JSON.stringify(response.error)
        );
      }

      setValue("title", "");
      setValue("description", "");
      setValue("owner", "");
      setValue("price", 0);
      if (setSelectedImage) setSelectedImage(null);
      setImageUrl("");

      // const provider = new Web3Provider(window.ethereum);
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();
      // const contract = new Contract(CONTRACT_ADDRESS, MyNFT.abi, signer);
      // const tx = await contract.mintNFT(account, pinataResponse.IpfsHash);
      // await tx.wait();
      toast({
        title: "NFT Minted Successfully",
        description: `NFT created with title: ${data.title}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Minting error:", error);
      toast({
        title: "Minting Failed",
        description: `Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
        variant: "destructive",
      });
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
            <LabelledTextField
              type="text"
              label="Title"
              placeholder="NFT Title"
              {...register("title")}
            />
            <Textarea placeholder="Description" {...register("description")} />
            <LabelledTextField
              label="Votre address"
              placeholder="Votre adress wallet"
              {...register("owner")}
            />
            <span className="text-red-500 text-sm">
              {errors.owner?.message}
            </span>
            <LabelledTextField
              label="Price"
              type="number"
              placeholder="Price (ETH)"
              {...register("price")}
            />
            <span className="text-red-500 text-sm">
              {errors.price?.message}
            </span>
            <Button type="submit" disabled={minting} className="w-full">
              {minting ? "Minting..." : "Create and Mint NFT"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
