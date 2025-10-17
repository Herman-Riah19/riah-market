"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract-config";
import { useUserAddress } from "@/hooks/useUserAdress";
import { useShallow } from "zustand/react/shallow";

type FormValues = z.infer<typeof createProductSchema>;
export interface IFormCreateNftProps {
  selectedImage?: File | null;
  setSelectedImage?: (image: File | null) => void;
}

export function FormCreateNft({
  selectedImage,
  setSelectedImage,
}: IFormCreateNftProps) {
  const address = useUserAddress(useShallow((state) => state.address));

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
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      image: "",
      owner: address as string,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (setSelectedImage) setSelectedImage(file);
  };

  const onSubmit = async (data: FormValues) => {
    if (!selectedImage) return alert("Please select an image.");
    setMinting(true);

    try {
      // 1️⃣ Upload image to Pinata
      const fileData = new FormData();
      fileData.set("file", selectedImage);

      const pinataResponse = await uploadToPinata(fileData);
      if (pinataResponse instanceof Error) {
        throw pinataResponse;
      }

      const ipfsHash = pinataResponse.IpfsHash as string;
      const metadataURL = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      setImageUrl(pinataResponse.IpfsHash as string);

      // 2️⃣ Connexion au wallet via Metamask
      if (!(window as any).ethereum) {
        throw new Error("MetaMask n'est pas installé");
      }

      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      // 3️⃣ Initialiser le contrat
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.mintNFT(
        data.owner, // recipient
        metadataURL, // tokenURI
        data.title, // title
        metadataURL, // image
        data.description, // description
        ethers.parseEther(data.price.toString()), // price en wei si ERC721
        "Profile info" // profile
      );
      await tx.wait();

      const response = await saveProduct({
        title: data.title,
        image: metadataURL,
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

      // 6️⃣ Réinitialiser le formulaire
      setValue("title", "");
      setValue("description", "");
      setValue("owner", "");
      setValue("price", 0);
      if (setSelectedImage) setSelectedImage(null);
      setImageUrl("");

      toast({
        title: "✅ NFT Minted Successfully",
        description: `NFT created with title: ${data.title}`,
      });
    } catch (error) {
      console.error("Minting error:", error);
      toast({
        title: "❌ Minting Failed",
        description: `Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
        variant: "destructive",
      });
    } finally {
      setMinting(false);
    }
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
                  style={{ position: "absolute", opacity: 0 }}
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
