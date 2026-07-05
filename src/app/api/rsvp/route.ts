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
  nombre: string;
  asistencia: "si" | "no";
  acompanantes: string | null;
  dieta: string;
  cancion: string;
}

export async function POST(request: Request) {
  try {
    const body: RSVPPayload = await request.json();
    const { nombre, asistencia, acompanantes, dieta, cancion } = body;

    if (!nombre?.trim() || (asistencia !== "si" && asistencia !== "no")) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const attending = asistencia === "si";

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const lines = [
      `Nombre: ${nombre.trim()}`,
      `Asistencia: ${attending ? "Sí, asistirá" : "No podrá asistir"}`,
    ];
    if (attending) {
      lines.push(`Número de invitados (incluyéndose): ${acompanantes || "1"}`);
      lines.push(`Restricciones alimenticias: ${dieta?.trim() || "—"}`);
      lines.push(`Canción para la playlist: ${cancion?.trim() || "—"}`);
    }

    const emailBody = [
      "Nueva confirmación RSVP — Boda Ana Isabel & José Andrés",
      "",
      ...lines,
      "",
      "---",
      "Enviado desde el sitio web de la boda (#PequeBoda)",
    ].join("\n");

    await transporter.sendMail({
      from: `"Boda Ana & José" <${FROM_EMAIL}>`,
      to: PLANNER_EMAIL,
      subject: `RSVP: ${nombre.trim()} — ${attending ? "Asiste" : "No asiste"}`,
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
