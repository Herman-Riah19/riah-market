"use server";
import { getUserConnected } from "@/lib/authentification";
import { prisma } from "@/utils/prisma";
import {
  createProductSchema,
  updateProductOnSellSchema,
  deleteProductSchema,
} from "@/validators/product-schema";

type CreateProductInput = {
  title: string;
  description?: string;
  image: string;
  price: number;
  owner: string;
};

type UpdateProductInput = Partial<CreateProductInput> & { id: string };

export async function saveProduct(input: CreateProductInput) {
  const user = await getUserConnected();
  const result = createProductSchema.safeParse(input);
  if (!result.success) return { success: false, error: result.error };

  try {
    const product = await prisma.product.create({
      data: {
        ...input,
        creator: user?.id,
      },
    });
    return { success: true, product };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function listProducts() {
  try {
    const products = await prisma.product.findMany();
    return { success: true, products };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updateProduct(input: UpdateProductInput) {
  const result = updateProductOnSellSchema.safeParse(input);
  if (!result.success) return { success: false, error: result.error };

  try {
    const product = await prisma.product.update({
      where: { id: input.id },
      data: { ...input, id: undefined },
    });
    return { success: true, product };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteProduct(id: string) {
  const result = deleteProductSchema.safeParse({ id });
  if (!result.success) return { success: false, error: result.error };

  try {
    await prisma.product.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
