import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { verifySolution } from "altcha-lib";

// ============================================
// SMTP CONFIGURATION — Replace with your values
// ============================================
const SMTP_HOST = process.env.SMTP_HOST || "smtp.example.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER || "user@example.com";
const SMTP_PASS = process.env.SMTP_PASS || "password";
const PLANNER_EMAIL = process.env.PLANNER_EMAIL || "planner@example.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "boda@example.com";
const HMAC_KEY = process.env.ALTCHA_HMAC_KEY || "change-me-to-a-random-secret";

interface RSVPPayload {
  groupLabel: string;
  guests: string[];
  plusOnes: string[];
  contactName: string;
  email: string;
  phone: string;
  altcha: string;
}

export async function POST(request: Request) {
  try {
    const body: RSVPPayload = await request.json();
    const { groupLabel, guests, plusOnes, contactName, email, phone, altcha } = body;

    if (!guests.length || !contactName || !email || !phone) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Verify ALTCHA proof-of-work
    const verified = await verifySolution(altcha, HMAC_KEY);
    if (!verified) {
      return NextResponse.json(
        { error: "Verificación de seguridad fallida" },
        { status: 403 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const guestList = guests.map((g) => `  - ${g}`).join("\n");
    const plusOneList =
      plusOnes.length > 0
        ? `\n\nAcompañantes adicionales (+1):\n${plusOnes.map((p) => `  - ${p}`).join("\n")}`
        : "";
    const totalCount = guests.length + plusOnes.length;
    const emailBody = `
Nueva confirmación de asistencia - Boda Ana Isabel & José Andrés

Grupo: ${groupLabel}
Enviado por: ${contactName}
Email: ${email}
Teléfono: ${phone}

Invitados confirmados (${totalCount} en total):
${guestList}${plusOneList}

---
Enviado desde el sitio web de la boda
    `.trim();

    await transporter.sendMail({
      from: `"Boda Ana & José" <${FROM_EMAIL}>`,
      to: PLANNER_EMAIL,
      subject: `RSVP: ${contactName} — ${totalCount} invitado${totalCount > 1 ? "s" : ""}`,
      text: emailBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP email error:", error);
    return NextResponse.json(
      { error: "Error al enviar la confirmación" },
      { status: 500 }
    );
  }
}
