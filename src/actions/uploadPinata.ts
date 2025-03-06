"use server";

import pinataSDK from "@pinata/sdk";
import fs from "fs";
import { revalidatePath } from "next/cache";

const pinata = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY!,
  pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY!,
});

export async function uploadToIPFS(formData: FormData) {
  "use server"; // Indique que cette fonction est une Server Action

  const file = formData.get("file") as File | null;
  if (!file) return { success: false, message: "Aucun fichier sélectionné." };

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await pinata.pinFileToIPFS(fs.createReadStream(buffer), {
      pinataMetadata: { name: file.name },
    });

    revalidatePath("/"); // Réactualiser la page après upload
    return { success: true, ipfsHash: result.IpfsHash };
  } catch (error) {
    console.error("Erreur Pinata:", error);
    return { success: false, message: "Erreur lors de l'upload vers IPFS." };
  }
}
