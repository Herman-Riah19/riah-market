"use server";
import { pinata } from "@/utils/pinata-config";

export const uploadToPinata = async (data: FormData) => {
  try {
	const file: File | null = data.get("file") as unknown as File;
	const response = await pinata.upload.file(file);
	return response;
  } catch (error) {
	console.error("Pinata upload error:", error);
	return new Error("Failed to upload file to Pinata");
  }
}