"use client";

import { useState } from "react";
import { FormGenerateImage } from "../components/form/formGenerateImage";
import { FormCreateNft } from "../components/form/formCreateNft";
import { Button } from "@/components/ui/button";
import { ButtonConnectWallet } from "@/components/button/buttonConnect";

export default function PageGenerate() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [step, setStep] = useState<"choice" | "generate" | "mint">("choice");

  // Fonction pour revenir à l'étape précédente
  const handleBack = () => {
    if (step === "generate") setStep("choice");
    else if (step === "mint") setStep(selectedImage ? "generate" : "choice");
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Mint Your NFT</h1>

      {step === "choice" && (
        <div className="flex flex-col gap-4">
          <ButtonConnectWallet />
          <Button onClick={() => setStep("generate")}>
            Générer une image puis minter
          </Button>
          <Button onClick={() => setStep("mint")}>
            Minter directement votre NFT
          </Button>
        </div>
      )}

      {step === "generate" && (
        <>
          <FormGenerateImage setImage={setSelectedImage} />
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={handleBack}
            >
              Revenir en arrière
            </Button>
            <Button
              onClick={() => setStep("mint")}
              disabled={!selectedImage}
            >
              Suivant : Minter le NFT
            </Button>
          </div>
        </>
      )}

      {step === "mint" && (
        <>
          <FormCreateNft
            setStep={setStep}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <Button
            className="mt-4"
            variant="outline"
            onClick={handleBack}
          >
            Revenir en arrière
          </Button>
        </>
      )}
    </div>
  );
}
