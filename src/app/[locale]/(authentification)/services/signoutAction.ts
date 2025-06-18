'use server'
import { Hashing, hashPassword } from "@/lib/hash";
import { prisma } from "@/utils/prisma";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ErrorResponse = { 
  message: string; 
};

export async function userRegister({name, email, password, address}: {name: string, email: string, password: string, address: string}) {
  try {
    const existUser = await prisma.user.findFirst({
      where: {
        OR: [{ name }, { email }],
      },
    });

    if (existUser) {
      return { message: "name or email already exist." };
    }

    const { salt, hash } = hashPassword(password as string) as Hashing

    // Créer l'utilisateur avec le rôle associé
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        salt,
        address
      }
    });

    const secretKey = "secret";
    const rememberMeToken = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "7d",
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        rememberMe: rememberMeToken,
      },
    });
    console.log(user)

    revalidatePath('/sign-out');
    redirect('/sign-in');
  } catch (error) {
    console.log(error);
  }
}