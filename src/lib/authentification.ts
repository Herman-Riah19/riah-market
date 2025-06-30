import { NextAuthOptions, getServerSession, DefaultSession } from "next-auth";
import { ethers } from "ethers";
import { PrismaAdapter } from "@auth/prisma-adapter";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id?: string;
      address?: string;
    } & DefaultSession["user"];
  }
}
import { prisma } from "@/utils/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { verifyPassword } from "@/lib/hash";
import { randomUUID } from "crypto";

const secretKey = process.env.NEXTAUTH_SECRET || "defaultSecretKey";

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials?.email;
        const password = credentials?.password;

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordValid = verifyPassword(
          password,
          user.password as string,
          user.salt as string
        );
        if (!passwordValid) {
          throw new Error("Password invalid");
        }

        const rememberMe = true;

        // Génération du token "remember me" si demandé
        let rememberMeToken;
        if (rememberMe) {
          rememberMeToken = jwt.sign({ userId: user.id }, secretKey, {
            expiresIn: "7d",
          });
          // Mettre à jour le token "remember me" dans la base de données
          await prisma.user.update({
            where: { id: user.id },
            data: { rememberMe: rememberMeToken },
          });
        }

        return user;
      },
    }),
    CredentialsProvider({
      id: "authorize",
      name: "authorize",
      credentials: {
        address: { label: "Address", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        const { address, signature } = credentials ?? {};
        console.log("Authorize called with:", { address, signature });

        if (!signature || !address) {
          console.error("Missing signature or address");
          return null;
        }

        const record = await prisma.nonce.findUnique({
          where: { address: address.toLowerCase() },
        });

        if (!record) {
          console.error("No nonce record found for address", address);
          return null;
        }

        const nonce = record.nonce;
        const message = `Login with nonce: ${nonce}`;
        let signerAddr;
        try {
          signerAddr = ethers.verifyMessage(message, signature);
        } catch (e) {
          console.error("Signature verification failed:", e);
          return null;
        }

        if (signerAddr.toLowerCase() !== address.toLowerCase()) {
          console.error("Signature mismatch", signerAddr, address);
          return null;
        }

        await prisma.nonce.delete({
          where: { address: address.toLowerCase() },
        });

        let user = await prisma.user.findUnique({ where: { address } });
        if (!user) {
          user = await prisma.user.create({
            data: { address, name: "User" + randomUUID() },
          });
        }

        console.log("Authenticated user:", user);
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.address = (user as any).address;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.address) {
        session.user.address = token.address as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const getAuthSession = async () => {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return;
  }
  return session;
};

export const getUserConnected = async () => {
  const session = await getAuthSession();
  const user = await prisma.user.findFirst({
    where: {
      name: session?.user?.name,
    },
  });
  return user;
};
