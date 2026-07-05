"use client";

import { useEffect, useRef, useState } from "react";

type Asistencia = "" | "si" | "no";

export default function RSVPForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  const [nombre, setNombre] = useState("");
  const [asistencia, setAsistencia] = useState<Asistencia>("");
  const [acompanantes, setAcompanantes] = useState("1");
  const [dieta, setDieta] = useState("");
  const [cancion, setCancion] = useState("");

  const [errNombre, setErrNombre] = useState(false);
  const [errAsist, setErrAsist] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [confirmed, setConfirmed] = useState<{
    attending: boolean;
    fname: string;
  } | null>(null);
  const [confirmIn, setConfirmIn] = useState(false);

  const attending = asistencia === "si";

  // Fade the confirmation in and scroll it into view once it mounts.
  useEffect(() => {
    if (!confirmed) return;
    requestAnimationFrame(() => setConfirmIn(true));
    const el = confirmRef.current;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }, [confirmed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(false);

    const nameOk = nombre.trim().length > 0;
    const asistOk = asistencia !== "";
    setErrNombre(!nameOk);
    setErrAsist(!asistOk);

    if (!nameOk || !asistOk) {
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector(".field.error");
        if (first) {
          const top =
            first.getBoundingClientRect().top + window.scrollY - 140;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
      });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          asistencia,
          acompanantes: attending ? acompanantes : null,
          dieta: attending ? dieta.trim() : "",
          cancion: attending ? cancion.trim() : "",
        }),
      });
      if (!res.ok) throw new Error("request failed");

      const fname = nombre.trim().split(/\s+/)[0] || "";
      setConfirmed({ attending, fname });
    } catch {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  };

  if (confirmed) {
    return (
      <div ref={confirmRef} className={`confirm${confirmIn ? " in" : ""}`}>
        <div className="confirm__mono">A&amp;J</div>
        <h2 className="confirm__headline">
          {confirmed.attending
            ? `¡Gracias, ${confirmed.fname}!`
            : `Te vamos a extrañar, ${confirmed.fname}`}
        </h2>
        <p className="confirm__sub">
          {confirmed.attending
            ? "Hemos recibido tu confirmación. No podemos esperar para celebrar contigo el 8 de mayo en Cartagena."
            : "Gracias por avisarnos. Lamentamos que no puedas acompañarnos — estarás en nuestros corazones ese día."}
        </p>
        <div className="confirm__hash">#PequeBoda</div>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit}>
      <div className={`field${errNombre ? " error" : ""}`}>
        <label htmlFor="nombre">Nombre y apellido</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Tu nombre completo"
          autoComplete="name"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            if (errNombre && e.target.value.trim()) setErrNombre(false);
          }}
        />
        <div className="field__err">Por favor escribe tu nombre.</div>
      </div>

      <div className={`field${errAsist ? " error" : ""}`}>
        <span className="field__legend">¿Nos acompañas?</span>
        <div className="seg">
          <label>
            <input
              type="radio"
              name="asistencia"
              value="si"
              checked={asistencia === "si"}
              onChange={() => {
                setAsistencia("si");
                setErrAsist(false);
              }}
            />
            <span>Sí, ahí estaré</span>
          </label>
          <label>
            <input
              type="radio"
              name="asistencia"
              value="no"
              checked={asistencia === "no"}
              onChange={() => {
                setAsistencia("no");
                setErrAsist(false);
              }}
            />
            <span>No podré ir</span>
          </label>
        </div>
        <div className="field__err">Por favor selecciona una opción.</div>
      </div>

      <div data-when-yes style={{ display: attending ? "" : "none" }}>
        <div className="field">
          <label htmlFor="acompanantes">
            Número de invitados (incluyéndote)
          </label>
          <select
            id="acompanantes"
            name="acompanantes"
            value={acompanantes}
            onChange={(e) => setAcompanantes(e.target.value)}
          >
            <option value="1">1 persona</option>
            <option value="2">2 personas</option>
            <option value="3">3 personas</option>
            <option value="4">4 personas</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="dieta">Restricciones alimenticias</label>
          <input
            type="text"
            id="dieta"
            name="dieta"
            placeholder="Vegetariano, alergias, etc. (opcional)"
            value={dieta}
            onChange={(e) => setDieta(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="cancion">¿Qué canción no puede faltar?</label>
          <input
            type="text"
            id="cancion"
            name="cancion"
            placeholder="Para nuestra playlist (opcional)"
            value={cancion}
            onChange={(e) => setCancion(e.target.value)}
          />
        </div>
      </div>

      <div className="rsvp-submit">
        <button type="submit" className="btn" disabled={sending}>
          {sending ? "Enviando…" : "Enviar Confirmación"}
        </button>
      </div>

      {submitError && (
        <p
          className="field__err"
          style={{ display: "block", textAlign: "center", marginTop: 16 }}
        >
          Hubo un error al enviar. Por favor, intenta de nuevo.
        </p>
      )}
    </form>
  );
}
