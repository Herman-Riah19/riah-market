"use client";

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

import { useState } from "react";

import { FormGenerateImage } from "../components/form/formGenerateImage";
import { FormCreateNft } from "../components/form/formCreateNft";

const PageGenerate = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [state, setState] = useState(1);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Mint Your NFT</h1>
      {state === 1 && (
        <FormGenerateImage setImage={setSelectedImage} setState={setState} />
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

export default PageGenerate;
