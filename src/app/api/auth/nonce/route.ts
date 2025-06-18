// app/api/auth/nonce/route.ts
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

// In-memory nonce store
const nonces = new Map<string, string>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  const nonce = randomBytes(16).toString("hex");
  nonces.set(address.toLowerCase(), nonce);

  return NextResponse.json({ nonce });
}

export { nonces };
