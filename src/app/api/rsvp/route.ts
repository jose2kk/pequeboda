import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ============================================
// SMTP CONFIGURATION — set these in .env
// ============================================
const SMTP_HOST = process.env.SMTP_HOST || "smtp.example.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER || "user@example.com";
const SMTP_PASS = process.env.SMTP_PASS || "password";
const PLANNER_EMAIL = process.env.PLANNER_EMAIL || "planner@example.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "boda@example.com";

interface RSVPPayload {
  groupId: string;
  household: string[];
  respondedBy: string;
  attending: string[];
  notAttending: string[];
  companions: string[];
  dieta: string;
  cancion: string;
}

export async function POST(request: Request) {
  try {
    const body: RSVPPayload = await request.json();
    const {
      groupId,
      household,
      respondedBy,
      attending,
      notAttending,
      companions,
      dieta,
      cancion,
    } = body;

    if (!respondedBy?.trim() || !Array.isArray(household) || !household.length) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const attendingCount = (attending?.length || 0) + (companions?.length || 0);
    const list = (arr: string[]) =>
      arr?.length ? arr.map((n) => `  - ${n}`).join("\n") : "  (ninguno)";

    const lines = [
      `Respondió: ${respondedBy.trim()}`,
      `Grupo (${groupId}): ${household.join(", ")}`,
      "",
      `Asisten (${attendingCount}):`,
      list(attending),
    ];
    if (companions?.length) {
      lines.push("", "Acompañantes (+1):", list(companions));
    }
    if (notAttending?.length) {
      lines.push("", "No asisten:", list(notAttending));
    }
    if (dieta?.trim()) lines.push("", `Restricciones alimenticias: ${dieta.trim()}`);
    if (cancion?.trim()) lines.push(`Canción para la playlist: ${cancion.trim()}`);

    const emailBody = [
      "Nueva confirmación RSVP — Boda Ana Isabel & José Andrés",
      "",
      ...lines,
      "",
      "---",
      "Enviado desde el sitio web de la boda (#PequeBoda)",
    ].join("\n");

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Boda Ana & José" <${FROM_EMAIL}>`,
      to: PLANNER_EMAIL,
      subject: `RSVP: ${respondedBy.trim()} — ${attendingCount} asisten`,
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
