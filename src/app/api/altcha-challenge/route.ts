import { NextResponse } from "next/server";
import { createChallenge } from "altcha-lib";

const HMAC_KEY = process.env.ALTCHA_HMAC_KEY || "change-me-to-a-random-secret";

export async function GET() {
  try {
    const challenge = await createChallenge({
      hmacKey: HMAC_KEY,
      maxNumber: 50000,
      algorithm: "SHA-256",
    });

    return NextResponse.json(challenge);
  } catch (error) {
    console.error("ALTCHA challenge error:", error);
    return NextResponse.json(
      { error: "Error al generar el desafío" },
      { status: 500 }
    );
  }
}
