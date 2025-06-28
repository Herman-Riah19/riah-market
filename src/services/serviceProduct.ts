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

type UpdateProductInput = Partial<CreateProductInput> & { id: string, buyer: string };

export async function saveProduct(input: CreateProductInput) {
  const user = await getUserConnected();
  const result = createProductSchema.safeParse(input);
  if (!result.success) return { success: false, error: result.error };

  if (!user) return { success: false, error: "User not authenticated" };

  if(user.address !== input.owner) {
    return { success: false, error: "Owner address does not match user address" };
  }

  try {
    const product = await prisma.product.create({
      data: {
        ...input,
        creator: user?.id,
        mintedOn: new Date(),
      },
    });
    return { success: true, product };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function getAllImageGenerated() {
    try {
        const user = await getUserConnected()
        const images = await prisma.product.findMany({
            where: {
                creator: user?.id
            },
        })
        return images;
    } catch (error) {
        console.log(error)
    }
  }
  

export async function listProducts({ name, filter }: { name?: string, filter?: number } = {}) {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: name,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
      take: filter ? filter : undefined,
    });
    return { success: true, products };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function getProductById(id: string) {
  const result = deleteProductSchema.safeParse({ id });
  if (!result.success) return { success: false, error: result.error };

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return { success: false, error: "Product not found" };
    return { success: true, product };
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
