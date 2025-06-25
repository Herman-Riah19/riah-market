import { z } from "zod";

// Schéma de base pour le produit
const basicProductSchema = {
    id: z.string().cuid().describe("Identifiant unique du produit"),
    title: z.string().min(1, "Le titre est requis").describe("Titre du produit"),
    creator: z.string().optional().nullable().describe("ID de l'utilisateur créateur"),
    price: z.coerce.number().positive("Le prix doit être positif").describe("Prix du produit"),
    image: z.string().optional().describe("URL de l'image du produit"),
    profile: z.string().optional().nullable().describe("Image de profil ou ID"),
    description: z.string().optional().nullable().describe("Description du produit"),
    tokenId: z.string().optional().nullable().describe("ID du token NFT"),
    contract: z.string().optional().nullable().describe("Adresse du contrat NFT"),
    owner: z.string().describe("ID du propriétaire"),
    mintedOn: z.coerce.date().optional().nullable().describe("Date de mint du NFT"),
    createdAt: z.coerce.date().optional().describe("Date de création du produit"),
    updatedAt: z.coerce.date().optional().describe("Date de mise à jour du produit"),
};

// Schéma complet du produit
export const productSchema = z.object(basicProductSchema).strict().describe("Schéma complet du produit");

// Schéma pour la création d'un produit (seulement les variables obligatoires)
export const createProductSchema = z.object({
    title: basicProductSchema.title,
    description: basicProductSchema.description.optional(),
    price: basicProductSchema.price,
    image: basicProductSchema.image,
    owner: basicProductSchema.owner,
}).strict().describe("Schéma pour la création d'un produit");

// Schéma pour la mise à jour lors de la vente NFT
export const updateProductOnSellSchema = z.object({
    id: basicProductSchema.id,
    owner: basicProductSchema.owner.refine(val => !!val, { message: "Le propriétaire est requis lors de la vente" }),
    tokenId: basicProductSchema.tokenId.refine(val => !!val, { message: "Le tokenId est requis lors de la vente" }),
    contract: basicProductSchema.contract.refine(val => !!val, { message: "Le contrat est requis lors de la vente" }),
    mintedOn: basicProductSchema.mintedOn.refine(val => !!val, { message: "La date de mint est requise lors de la vente" }),
    updatedAt: basicProductSchema.updatedAt,
}).strict().describe("Schéma pour la mise à jour après la vente NFT");

// Schéma pour la suppression d'un produit
export const deleteProductSchema = z.object({
    id: basicProductSchema.id,
}).strict().describe("Schéma pour la suppression d'un produit");
