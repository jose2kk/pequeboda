export interface Guest {
  id: string;
  name: string;
  allowPlusOne?: boolean;
}

export interface InviteGroup {
  id: string;
  label: string; // display name for the group
  members: Guest[];
}

// ============================================
// GUEST LIST — Add your invitees here
//
// Each InviteGroup is a self-contained unit.
// - Family groups: multiple members who can confirm each other
// - Solo invitees: a group with a single member
// - allowPlusOne on a member lets them add one companion by name
// ============================================
export const INVITE_GROUPS: InviteGroup[] = [
  // ── Family groups ──────────────────────────
  {
    id: "martinez",
    label: "Familia Martínez",
    members: [
      { id: "m1", name: "Roberto Martínez" },
      { id: "m2", name: "Laura Martínez", allowPlusOne: true },
      { id: "m3", name: "Sofía Martínez" },
      { id: "m4", name: "Camilo Martínez" },
    ],
  },
  {
    id: "rodriguez",
    label: "Familia Rodríguez",
    members: [
      { id: "r1", name: "Diego Rodríguez", allowPlusOne: true },
      { id: "r2", name: "Valentina Rodríguez" },
      { id: "r3", name: "Mateo Rodríguez", allowPlusOne: true },
    ],
  },
  {
    id: "gomez",
    label: "Familia Gómez",
    members: [
      { id: "g1", name: "Alejandro Gómez" },
      { id: "g2", name: "Patricia Gómez" },
    ],
  },

  // ── Solo invitees ──────────────────────────
  {
    id: "carlos",
    label: "Carlos Pérez",
    members: [{ id: "s1", name: "Carlos Pérez", allowPlusOne: true }],
  },
  {
    id: "maria",
    label: "María García",
    members: [{ id: "s2", name: "María García", allowPlusOne: true }],
  },
  {
    id: "andres",
    label: "Andrés López",
    members: [{ id: "s3", name: "Andrés López" }],
  },
  {
    id: "camila",
    label: "Camila Torres",
    members: [{ id: "s4", name: "Camila Torres", allowPlusOne: true }],
  },
  {
    id: "sebastian",
    label: "Sebastián Herrera",
    members: [{ id: "s5", name: "Sebastián Herrera" }],
  },
  {
    id: "isabella",
    label: "Isabella Morales",
    members: [{ id: "s6", name: "Isabella Morales", allowPlusOne: true }],
  },
  {
    id: "julian",
    label: "Julián Castro",
    members: [{ id: "s7", name: "Julián Castro" }],
  },
];
