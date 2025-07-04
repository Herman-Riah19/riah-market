"use server";
import { getUserConnected } from "@/lib/authentification";
import { Hashing, hashPassword } from "@/lib/hash";
import { prisma } from "@/utils/prisma";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ErrorResponse = {
  message: string;
};

export async function userRegister({
  name,
  email,
  password,
  address,
}: {
  name: string;
  email: string;
  password: string;
  address: string;
}) {
  try {
    const existUser = await prisma.user.findFirst({
      where: {
        OR: [{ name }, { email }],
      },
    });

    if (existUser) {
      return { message: "name or email already exist." };
    }

    const { salt, hash } = hashPassword(password as string) as Hashing;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        salt,
        address,
      },
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

    revalidatePath("/sign-out");
    redirect("/sign-in");
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByAddressAction(address: string) {
  try {
    if (!address) {
      throw new Error("Address is required");
    }
    const user = await prisma.user.findFirst({
      where: {
        address: address,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Error fetching user by address:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function userUpdate({ name }: { name: string }) {
  try {
    const existUser = await getUserConnected();

    const user = await prisma.user.update({
      where: {
        email: existUser?.email as string
      },
      data: {
        name,
      },
    });

    console.log(user)

    revalidatePath('/setting');
    redirect('/setting');
  } catch (error) {
    console.log(error);
    return error
  }
}

export async function changePassword({ password, confirmPassword } : { password: string, confirmPassword:  string }) {
  try {
    const existUser = await getUserConnected();
    
    if(password !== confirmPassword) {
      throw new Error('Your password was not equal')
    }

    const { salt, hash } = hashPassword(password as string) as Hashing
    const user = await prisma.user.update({
      where: {
        email: existUser?.email as string
      },
      data: {
        password: hash,
        salt,
      },
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

    revalidatePath('/setting');
    redirect('/setting');
  } catch (error) {
    console.log(error);
    return error
  }
}
