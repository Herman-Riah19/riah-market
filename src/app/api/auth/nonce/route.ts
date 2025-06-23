// app/api/auth/nonce/route.ts
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  const nonce = randomBytes(16).toString("hex");
  await prisma.nonce.upsert({
    where: { address: address.toLowerCase() },
    update: { nonce },
    create: { address: address.toLowerCase(), nonce },
  });

  return NextResponse.json({ nonce });
}
