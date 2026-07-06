import type { Metadata } from "next";
import RSVPForm from "@/components/RSVPForm";

export const metadata: Metadata = {
  title: "RSVP — Ana Isabel & José Andrés",
  description: "Confirma tu asistencia a nuestra celebración en Cartagena.",
};

export default function RSVPPage() {
  return (
    <main className="rsvp-layout">
      <div className="rsvp-inner">
        <div className="rsvp-head">
          <div className="rsvp-mono">A&amp;J</div>
          <h1 className="rsvp-main__title">R.S.V.P.</h1>
          <p className="rsvp-meta">8 · Mayo · 2027 — Cartagena, Colombia</p>
          <p className="rsvp-main__lead">
            Nos encantaría contar contigo. Busca tu nombre para confirmar tu
            asistencia.
          </p>
          <p className="rsvp-deadline">Antes del 1 de marzo de 2027</p>
        </div>

        <RSVPForm />
      </div>
    </main>
  );
}
