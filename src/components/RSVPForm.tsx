"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INVITE_GROUPS, type InviteGroup, type Guest } from "@/data/guests";
import AltchaWidget from "@/components/AltchaWidget";

/* ─── Subcomponents ─────────────────────────── */

function GuestMultiSelect({
  members,
  selectedIds,
  onToggle,
  open,
  onToggleOpen,
  dropdownRef,
}: {
  members: Guest[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  open: boolean;
  onToggleOpen: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}) {
  const selectedNames = members
    .filter((m) => selectedIds.has(m.id))
    .map((m) => m.name);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={onToggleOpen}
        className="w-full flex items-center justify-between bg-transparent border-b-2 border-foreground/15 hover:border-foreground/30 py-3 text-left transition-colors"
      >
        <span
          className={`font-[family-name:var(--font-body)] text-sm sm:text-base truncate pr-4 ${
            selectedNames.length > 0 ? "text-foreground" : "text-muted/40"
          }`}
        >
          {selectedNames.length > 0
            ? selectedNames.join(", ")
            : "Seleccionar invitados..."}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`text-muted shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border border-foreground/10 shadow-lg z-20 max-h-60 overflow-y-auto"
          >
            {members.map((guest) => {
              const isSelected = selectedIds.has(guest.id);
              return (
                <button
                  key={guest.id}
                  type="button"
                  onClick={() => onToggle(guest.id)}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-cream transition-colors border-b border-foreground/5 last:border-b-0 text-left"
                >
                  <div
                    className={`w-4 h-4 border-2 flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? "bg-foreground border-foreground"
                        : "border-foreground/30"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-[family-name:var(--font-body)] text-foreground text-sm sm:text-base">
                    {guest.name}
                  </span>
                  {guest.allowPlusOne && (
                    <span className="text-muted text-[10px] font-[family-name:var(--font-caps)] tracking-[0.15em] uppercase ml-auto">
                      +1
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlusOneInput({
  value,
  onChange,
  onRemove,
}: {
  value: string;
  onChange: (val: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nombre del acompañante"
        className="flex-1 bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none py-2 text-sm font-[family-name:var(--font-body)] text-foreground placeholder:text-muted/50 transition-colors"
      />
      <button
        type="button"
        onClick={onRemove}
        className="text-muted hover:text-foreground transition-colors p-1"
        aria-label="Eliminar acompañante"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 4l8 8M12 4l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

/* ─── Main form ─────────────────────────────── */

export default function RSVPForm() {
  // Step 1: identify your group
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<InviteGroup | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Step 2: select attendees within your group
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [plusOnes, setPlusOnes] = useState<Record<string, string>>({});
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
  const memberDropdownRef = useRef<HTMLDivElement>(null);

  // Contact info
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [altchaPayload, setAltchaPayload] = useState<string | null>(null);

  const onAltchaVerified = useCallback((payload: string) => {
    setAltchaPayload(payload);
  }, []);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        memberDropdownRef.current &&
        !memberDropdownRef.current.contains(e.target as Node)
      ) {
        setMemberDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Normalize text: remove accents/diacritics for accent-insensitive search
  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Build flat list of searchable individuals with their group reference
  const allMembers = useMemo(
    () =>
      INVITE_GROUPS.flatMap((group) =>
        group.members.map((member) => ({ member, group }))
      ),
    []
  );

  // Search results: match individual names
  const searchResults = useMemo(() => {
    const q = normalize(searchQuery.trim());
    if (!q) return [];

    return allMembers.filter((entry) =>
      normalize(entry.member.name).includes(q)
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, allMembers]);

  const selectMember = (group: InviteGroup, memberId: string) => {
    setSelectedGroup(group);
    setSearchQuery("");
    setDropdownOpen(false);
    // Pre-select the person who searched + all group members
    setSelectedIds(new Set(group.members.map((m) => m.id)));
    setPlusOnes({});
  };

  const resetGroup = () => {
    setSelectedGroup(null);
    setSelectedIds(new Set());
    setPlusOnes({});
    setSearchQuery("");
  };

  const toggleGuest = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setPlusOnes((p) => {
          const updated = { ...p };
          delete updated[id];
          return updated;
        });
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const addPlusOne = (guestId: string) => {
    setPlusOnes((prev) => ({ ...prev, [guestId]: "" }));
  };

  const removePlusOne = (guestId: string) => {
    setPlusOnes((prev) => {
      const updated = { ...prev };
      delete updated[guestId];
      return updated;
    });
  };

  const selectedGuests = selectedGroup
    ? selectedGroup.members.filter((g) => selectedIds.has(g.id))
    : [];
  const plusOneNames = Object.values(plusOnes).filter((name) => name.trim());
  const totalAttendees = selectedGuests.length + plusOneNames.length;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case "contactName":
        return value.trim() ? null : "El nombre es obligatorio";
      case "email":
        if (!value.trim()) return "El correo es obligatorio";
        if (!emailPattern.test(value.trim())) return "Ingresa un correo electrónico válido";
        return null;
      case "phone": {
        const digits = value.replace(/\D/g, "");
        if (!value.trim()) return "El teléfono es obligatorio";
        if (digits.length < 7) return "Ingresa un número de teléfono válido (mínimo 7 dígitos)";
        return null;
      }
      default:
        return null;
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    if (field === "contactName") setContactName(value);
    else if (field === "email") setEmail(value);
    else if (field === "phone") setPhone(value);

    // Live-clear errors as user types, live-validate if already touched
    const error = validateField(field, value);
    setFormErrors((prev) => {
      const next = { ...prev };
      if (error && touched[field]) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleFieldBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setFormErrors((prev) => {
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  const validateForm = (): boolean => {
    const fields = { contactName, email, phone };
    const errors: Record<string, string> = {};
    const allTouched: Record<string, boolean> = {};

    for (const [field, value] of Object.entries(fields)) {
      allTouched[field] = true;
      const error = validateField(field, value);
      if (error) errors[field] = error;
    }

    setTouched((prev) => ({ ...prev, ...allTouched }));
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuests.length) return;
    if (!validateForm()) return;
    if (!altchaPayload) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupLabel: selectedGroup?.label,
          guests: selectedGuests.map((g) => g.name),
          plusOnes: plusOneNames,
          contactName: contactName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          altcha: altchaPayload,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  /* ─── Success state ─── */
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <p className="font-[family-name:var(--font-script)] text-foreground text-5xl sm:text-6xl mb-6">
          Gracias
        </p>
        <p className="font-[family-name:var(--font-body)] text-foreground text-base sm:text-lg mb-2">
          Tu confirmación ha sido enviada.
        </p>
        <p className="font-[family-name:var(--font-body)] text-muted text-sm sm:text-base">
          Nos pondremos en contacto contigo pronto.
        </p>
      </motion.div>
    );
  }

  /* ─── Step 1: Find your group ─── */
  if (!selectedGroup) {
    return (
      <div className="space-y-6">
        <p className="text-accent tracking-[0.3em] uppercase text-xs sm:text-sm mb-2 font-[family-name:var(--font-caps)]">
          Busca tu nombre
        </p>

        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => searchQuery.trim() && setDropdownOpen(true)}
            placeholder="Escribe tu nombre o apellido..."
            className="w-full bg-transparent border-b-2 border-foreground/15 focus:border-foreground/40 outline-none py-3 text-base font-[family-name:var(--font-body)] text-foreground placeholder:text-muted/40 transition-colors"
          />

          {/* Dropdown results */}
          <AnimatePresence>
            {dropdownOpen && searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-background border border-foreground/10 shadow-lg max-h-64 overflow-y-auto z-20"
              >
                {searchResults.length > 0 ? (
                  searchResults.map(({ member, group }) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => selectMember(group, member.id)}
                      className="w-full text-left px-5 py-3.5 hover:bg-cream transition-colors border-b border-foreground/5 last:border-b-0"
                    >
                      <span className="font-[family-name:var(--font-body)] text-foreground text-sm sm:text-base block">
                        {member.name}
                      </span>
                      {group.members.length > 1 && (
                        <span className="text-muted text-xs font-[family-name:var(--font-caps)] tracking-[0.1em] mt-0.5 block">
                          {group.label}
                        </span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-5 py-4 text-center">
                    <p className="text-muted text-sm font-[family-name:var(--font-body)]">
                      No se encontró ningún invitado
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-muted/60 text-xs font-[family-name:var(--font-body)] text-center">
          Escribe tu nombre para encontrar tu invitación
        </p>
      </div>
    );
  }

  /* ─── Step 2: Confirm attendees + contact info ─── */
  const isFamily = selectedGroup.members.length > 1;

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Group header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent tracking-[0.3em] uppercase text-xs sm:text-sm font-[family-name:var(--font-caps)]">
            {isFamily ? "Tu grupo" : "Tu invitación"}
          </p>
          <p className="font-[family-name:var(--font-body)] text-foreground text-base sm:text-lg mt-1">
            {selectedGroup.label}
          </p>
        </div>
        <button
          type="button"
          onClick={resetGroup}
          className="text-muted text-xs font-[family-name:var(--font-caps)] tracking-[0.2em] uppercase hover:text-foreground transition-colors"
        >
          Cambiar
        </button>
      </div>

      {/* Member selection */}
      <div>
        <p className="text-accent tracking-[0.3em] uppercase text-xs sm:text-sm mb-4 font-[family-name:var(--font-caps)]">
          {isFamily
            ? "¿Quiénes asistirán?"
            : "Confirma tu asistencia"}
        </p>

        <GuestMultiSelect
          members={selectedGroup.members}
          selectedIds={selectedIds}
          onToggle={toggleGuest}
          open={memberDropdownOpen}
          onToggleOpen={() => setMemberDropdownOpen((v) => !v)}
          dropdownRef={memberDropdownRef}
        />

        {/* Plus-one inputs for selected members that allow it */}
        {selectedGroup.members
          .filter((g) => g.allowPlusOne && selectedIds.has(g.id))
          .map((guest) => (
            <div key={guest.id} className="mt-4">
              <p className="text-muted text-xs font-[family-name:var(--font-caps)] tracking-[0.15em] uppercase mb-2">
                Acompañante de {guest.name}
              </p>
              {plusOnes[guest.id] !== undefined ? (
                <PlusOneInput
                  value={plusOnes[guest.id]}
                  onChange={(val) =>
                    setPlusOnes((prev) => ({
                      ...prev,
                      [guest.id]: val,
                    }))
                  }
                  onRemove={() => removePlusOne(guest.id)}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => addPlusOne(guest.id)}
                  className="text-accent text-xs font-[family-name:var(--font-caps)] tracking-[0.2em] uppercase hover:text-foreground transition-colors"
                >
                  + Agregar acompañante
                </button>
              )}
            </div>
          ))}
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center">
        <div className="h-px w-24 bg-foreground/15" />
      </div>

      {/* Contact Info */}
      <div>
        <p className="text-accent tracking-[0.3em] uppercase text-xs sm:text-sm mb-6 font-[family-name:var(--font-caps)]">
          Tus datos de contacto
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-foreground text-xs font-[family-name:var(--font-caps)] tracking-[0.2em] uppercase mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => handleFieldChange("contactName", e.target.value)}
              onBlur={() => handleFieldBlur("contactName", contactName)}
              className={`w-full bg-transparent border-b-2 outline-none py-3 text-base font-[family-name:var(--font-body)] text-foreground transition-colors ${
                formErrors.contactName ? "border-red-400" : "border-foreground/15 focus:border-foreground/40"
              }`}
            />
            {formErrors.contactName && (
              <p className="text-red-500 text-xs mt-1.5 font-[family-name:var(--font-body)]">{formErrors.contactName}</p>
            )}
          </div>

          <div>
            <label className="block text-foreground text-xs font-[family-name:var(--font-caps)] tracking-[0.2em] uppercase mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleFieldBlur("email", email)}
              className={`w-full bg-transparent border-b-2 outline-none py-3 text-base font-[family-name:var(--font-body)] text-foreground transition-colors ${
                formErrors.email ? "border-red-400" : "border-foreground/15 focus:border-foreground/40"
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1.5 font-[family-name:var(--font-body)]">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-foreground text-xs font-[family-name:var(--font-caps)] tracking-[0.2em] uppercase mb-2">
              Teléfono (WhatsApp)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              onBlur={() => handleFieldBlur("phone", phone)}
              placeholder="+57"
              className={`w-full bg-transparent border-b-2 outline-none py-3 text-base font-[family-name:var(--font-body)] text-foreground placeholder:text-muted/40 transition-colors ${
                formErrors.phone ? "border-red-400" : "border-foreground/15 focus:border-foreground/40"
              }`}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-xs mt-1.5 font-[family-name:var(--font-body)]">{formErrors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* ALTCHA verification */}
      <div>
        <AltchaWidget onVerified={onAltchaVerified} />
      </div>

      {/* Summary & Submit */}
      <div className="text-center space-y-4">
        {totalAttendees > 0 && (
          <p className="text-muted text-sm font-[family-name:var(--font-body)]">
            {totalAttendees} invitado{totalAttendees > 1 ? "s" : ""}{" "}
            confirmado{totalAttendees > 1 ? "s" : ""}
          </p>
        )}

        <button
          type="submit"
          disabled={
            status === "sending" ||
            !selectedGuests.length ||
            !altchaPayload
          }
          className="inline-block bg-foreground text-background font-[family-name:var(--font-caps)] tracking-[0.3em] uppercase text-xs sm:text-sm px-10 sm:px-14 py-4 hover:bg-foreground/85 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Enviando..." : "Confirmar Asistencia"}
        </button>

        {status === "error" && (
          <p className="text-red-600 text-sm font-[family-name:var(--font-body)]">
            Hubo un error al enviar. Por favor intenta de nuevo.
          </p>
        )}
      </div>
    </form>
  );
}
