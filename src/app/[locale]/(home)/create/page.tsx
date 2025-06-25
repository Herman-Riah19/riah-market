"use client";

import { useState } from "react";

import { FormGenerateImage } from "../components/form/formGenerateImage";
import { FormCreateNft } from "../components/form/formCreateNft";
import { Button } from "@/components/ui/button";

export default function PageGenerate () {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [state, setState] = useState(1);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Mint Your NFT</h1>
      <Button onClick={() => setState((prev) => prev + 1)}>
        next page
      </Button>
      {state === 1 && (
        <FormGenerateImage setImage={setSelectedImage} />
      )}
      {state === 2 && (
        <FormCreateNft 
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
    </div>
  );
};

