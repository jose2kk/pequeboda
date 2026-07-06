"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { INVITE_GROUPS, type InviteGroup } from "@/data/guests";

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

// Flat, pre-normalized index of every guest for the search box.
const SEARCH_INDEX = INVITE_GROUPS.flatMap((group) =>
  group.members.map((member) => ({
    member,
    group,
    norm: normalize(member.name),
  }))
);

const firstName = (full: string) => full.trim().split(/\s+/)[0] || "";

export default function RSVPForm() {
  const searchRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  // Step 1 — find your name
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // Step 2 — your household
  const [group, setGroup] = useState<InviteGroup | null>(null);
  const [searchedName, setSearchedName] = useState("");
  const [attendingIds, setAttendingIds] = useState<Set<string>>(new Set());
  const [companions, setCompanions] = useState<Record<string, string>>({});
  const [dieta, setDieta] = useState("");

  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [confirmed, setConfirmed] = useState<{
    attending: boolean;
    fname: string;
  } | null>(null);
  const [confirmIn, setConfirmIn] = useState(false);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return SEARCH_INDEX.filter((e) => e.norm.includes(q)).slice(0, 8);
  }, [query]);

  // Close the results dropdown on outside click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

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

  const pickMember = (g: InviteGroup, name: string) => {
    setGroup(g);
    setSearchedName(name);
    setAttendingIds(new Set(g.members.map((m) => m.id))); // default: all coming
    setCompanions({});
    setDieta("");
    setQuery("");
    setOpen(false);
    setSubmitError(false);
  };

  const resetGroup = () => {
    setGroup(null);
    setSearchedName("");
    setAttendingIds(new Set());
    setCompanions({});
  };

  const toggleAttending = (id: string) => {
    setAttendingIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setCompanions((c) => {
          const copy = { ...c };
          delete copy[id];
          return copy;
        });
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!group) return;
    setSubmitError(false);

    const attendingMembers = group.members.filter((m) =>
      attendingIds.has(m.id)
    );
    const companionNames = group.members
      .filter((m) => m.allowPlusOne && attendingIds.has(m.id))
      .map((m) => companions[m.id]?.trim())
      .filter((v): v is string => Boolean(v));

    setSending(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: group.id,
          household: group.members.map((m) => m.name),
          respondedBy: searchedName,
          attending: attendingMembers.map((m) => m.name),
          notAttending: group.members
            .filter((m) => !attendingIds.has(m.id))
            .map((m) => m.name),
          companions: companionNames,
          dieta: dieta.trim(),
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setConfirmed({
        attending: attendingMembers.length > 0,
        fname: firstName(searchedName),
      });
    } catch {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  };

  /* ── Confirmation ── */
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

  /* ── Step 1: find your name ── */
  if (!group) {
    return (
      <div className="field rsvp-search" ref={searchRef}>
        <label htmlFor="guest-search">Busca tu nombre</label>
        <input
          type="text"
          id="guest-search"
          autoComplete="off"
          placeholder="Escribe tu nombre o apellido"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query.trim() && setOpen(true)}
        />
        {open && query.trim() && (
          <div className="rsvp-search__results">
            {results.length > 0 ? (
              results.map(({ member, group: g }) => {
                const others = g.members
                  .filter((m) => m.id !== member.id)
                  .map((m) => m.name);
                return (
                  <button
                    key={member.id}
                    type="button"
                    className="rsvp-search__item"
                    onClick={() => pickMember(g, member.name)}
                  >
                    {member.name}
                    {others.length > 0 && <small>con {others.join(", ")}</small>}
                  </button>
                );
              })
            ) : (
              <div className="rsvp-search__empty">
                No encontramos ese nombre. Revisa la ortografía o escríbenos.
              </div>
            )}
          </div>
        )}
        <p className="rsvp-search__hint">
          Escribe tu nombre para encontrar tu invitación.
        </p>
      </div>
    );
  }

  /* ── Step 2: confirm your household ── */
  const anyAttending = group.members.some((m) => attendingIds.has(m.id));
  const multi = group.members.length > 1;

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="rsvp-group__head">
        <div>
          <span className="field__legend">
            {multi ? "Tu grupo" : "Tu invitación"}
          </span>
          <p className="rsvp-group__names">
            {group.members.map((m) => m.name).join(" · ")}
          </p>
        </div>
        <button
          type="button"
          className="rsvp-group__change"
          onClick={resetGroup}
        >
          Cambiar
        </button>
      </div>

      <div className="field">
        <span className="field__legend">
          {multi ? "¿Quiénes asistirán?" : "¿Nos acompañas?"}
        </span>
        <div className="guest-list">
          {group.members.map((m) => {
            const on = attendingIds.has(m.id);
            return (
              <div key={m.id} className="guest-item">
                <button
                  type="button"
                  className="guest-toggle"
                  aria-pressed={on}
                  onClick={() => toggleAttending(m.id)}
                >
                  <span className="guest-toggle__name">{m.name}</span>
                  <span className="guest-toggle__state">
                    {on ? "Asistirá" : "No asiste"}
                  </span>
                </button>
                {m.allowPlusOne && on && (
                  <input
                    type="text"
                    className="guest-plusone"
                    placeholder="Nombre de tu acompañante (opcional)"
                    value={companions[m.id] ?? ""}
                    onChange={(e) =>
                      setCompanions((c) => ({ ...c, [m.id]: e.target.value }))
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {anyAttending && (
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
      )}

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
