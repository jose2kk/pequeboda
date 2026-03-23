export interface Guest {
  id: string;
  name: string;
  allowPlusOne?: boolean;
}

export interface InviteGroup {
  id: string;
  label?: string;
  members: Guest[];
}

// ============================================
// GUEST LIST
//
// Each InviteGroup is a self-contained unit.
// - Groups: multiple members who can confirm each other
// - Solo invitees: a group with a single member
// - allowPlusOne on a member lets them add one companion by name
// ============================================
export const INVITE_GROUPS: InviteGroup[] = [
  {
    id: "g1",
    members: [
      { id: "g1-1", name: "Maria Elizabeth Iannitti" },
      { id: "g1-2", name: "Jesus Enrique Tudares" },
    ],
  },
  {
    id: "g2",
    members: [
      { id: "g2-1", name: "Andrea Tudares" },
      { id: "g2-2", name: "Victor Vargas" },
    ],
  },
  {
    id: "g3",
    members: [
      { id: "g3-1", name: "Anneliza Tudares" },
      { id: "g3-2", name: "Eduardo Gonzalez" },
    ],
  },
  {
    id: "g4",
    members: [
      { id: "g4-1", name: "Salvatore Iannitti" },
      { id: "g4-2", name: "Nancy Aristizabal" },
    ],
  },
  {
    id: "g5",
    members: [
      { id: "g5-1", name: "Valeria Urdaneta" },
      { id: "g5-2", name: "Novio de Valeria" },
    ],
  },
  {
    id: "g6",
    members: [
      { id: "g6-1", name: "Daniel Mann" },
      { id: "g6-2", name: "Joanna Morales" },
    ],
  },
  {
    id: "g7",
    members: [
      { id: "g7-1", name: "Aliana Morales" },
      { id: "g7-2", name: "Sergio (Novio de Aliana)" },
      { id: "g7-3", name: "Marcos David Guillen" },
      { id: "g7-4", name: "Jeffrey Jose Quintero" },
    ],
  },
  {
    id: "g8",
    members: [
      { id: "g8-1", name: "Joaly Karina Morales" },
      { id: "g8-2", name: "Brad Ray" },
    ],
  },
  {
    id: "g9",
    members: [
      { id: "g9-1", name: "Marian Morales" },
      { id: "g9-2", name: "Esposo de Marian" },
    ],
  },
  {
    id: "g10",
    members: [
      { id: "g10-1", name: "Ali Alberto Morales" },
      { id: "g10-2", name: "Auristel Araque" },
    ],
  },
  {
    id: "g11",
    members: [
      { id: "g11-1", name: "Maria Gracia Pina" },
      { id: "g11-2", name: "Andres Paez" },
    ],
  },
  {
    id: "g12",
    members: [
      { id: "g12-1", name: "Luis Jose Pina" },
      { id: "g12-2", name: "Claudia Pina" },
    ],
  },
  {
    id: "g13",
    members: [
      { id: "g13-1", name: "Jose Luis Pina" },
      { id: "g13-2", name: "Dubi Lugo" },
    ],
  },
  {
    id: "g14",
    members: [
      { id: "g14-1", name: "Alan Pina", allowPlusOne: true },
    ],
  },
  {
    id: "g15",
    members: [
      { id: "g15-1", name: "Victoria Pina" },
    ],
  },
  {
    id: "g16",
    members: [
      { id: "g16-1", name: "Francisco Rangel", allowPlusOne: true },
    ],
  },
  {
    id: "g17",
    members: [
      { id: "g17-1", name: "Karen Vanesa Gomez" },
      { id: "g17-2", name: "Douglas Carmona" },
    ],
  },
  {
    id: "g18",
    members: [
      { id: "g18-1", name: "Julio Avila" },
      { id: "g18-2", name: "Daniela Esis" },
    ],
  },
  {
    id: "g19",
    members: [
      { id: "g19-1", name: "Maria Laura Castro" },
      { id: "g19-2", name: "Alejandro Semprun" },
    ],
  },
  {
    id: "g20",
    members: [
      { id: "g20-1", name: "Cristina Colmenares" },
      { id: "g20-2", name: "Juan Jose Hoyos" },
    ],
  },
  {
    id: "g21",
    members: [
      { id: "g21-1", name: "Andres Aguilar" },
      { id: "g21-2", name: "Nando Aguilar" },
    ],
  },
  {
    id: "g22",
    members: [
      { id: "g22-1", name: "Andrea Rivas" },
    ],
  },
  {
    id: "g23",
    members: [
      { id: "g23-1", name: "Alexandra Pina" },
    ],
  },
  {
    id: "g24",
    members: [
      { id: "g24-1", name: "Maria Anez" },
      { id: "g24-2", name: "Enio Paez" },
    ],
  },
  {
    id: "g25",
    members: [
      { id: "g25-1", name: "Mileyda Silva" },
      { id: "g25-2", name: "Zorellys Silva" },
    ],
  },
  {
    id: "g26",
    members: [
      { id: "g26-1", name: "Ramon Castro" },
      { id: "g26-2", name: "Carolina Villasmil" },
      { id: "g26-3", name: "Vinicio Castro" },
    ],
  },
  {
    id: "g27",
    members: [
      { id: "g27-1", name: "Jose Luis Velasquez" },
      { id: "g27-2", name: "Milagros Castillo" },
      { id: "g27-3", name: "Alejandra Velasquez" },
      { id: "g27-4", name: "Jose Velasquez Jr." },
    ],
  },
  {
    id: "g28",
    members: [
      { id: "g28-1", name: "Enmanuel Santana" },
    ],
  },
  {
    id: "g29",
    members: [
      { id: "g29-1", name: "Angelly Escruceria" },
    ],
  },
  {
    id: "g30",
    members: [
      { id: "g30-1", name: "Manuela Gonzalez" },
    ],
  },
  {
    id: "g31",
    members: [
      { id: "g31-1", name: "Andrea Pena" },
    ],
  },
  {
    id: "g32",
    members: [
      { id: "g32-1", name: "Elizabeth Mann" },
      { id: "g32-2", name: "Gustavo Joves" },
    ],
  },
  {
    id: "g33",
    members: [
      { id: "g33-1", name: "Isamar Prieto" },
      { id: "g33-2", name: "Pablo Guastaferro" },
    ],
  },
  {
    id: "g34",
    members: [
      { id: "g34-1", name: "Jorge Romero" },
      { id: "g34-2", name: "Jani Mantilla" },
    ],
  },
  {
    id: "g35",
    members: [
      { id: "g35-1", name: "Isabella Soto" },
    ],
  },
  {
    id: "g36",
    members: [
      { id: "g36-1", name: "Alejandra Rios" },
    ],
  },
  {
    id: "g37",
    members: [
      { id: "g37-1", name: "Valentina Barbero" },
    ],
  },
  {
    id: "g38",
    members: [
      { id: "g38-1", name: "Gabriela Fernandez" },
      { id: "g38-2", name: "Juan Goncalves" },
    ],
  },
  {
    id: "g39",
    members: [
      { id: "g39-1", name: "Endrick Isturrieta" },
      { id: "g39-2", name: "Connie" },
    ],
  },
  {
    id: "g40",
    members: [
      { id: "g40-1", name: "Jorge Bracho" },
      { id: "g40-2", name: "Daniela" },
    ],
  },
  {
    id: "g41",
    members: [
      { id: "g41-1", name: "Ronny Chourio" },
    ],
  },
  {
    id: "g42",
    members: [
      { id: "g42-1", name: "Giselle Vega" },
    ],
  },
  {
    id: "g43",
    members: [
      { id: "g43-1", name: "Hernan Payan", allowPlusOne: true },
    ],
  },
  {
    id: "g44",
    members: [
      { id: "g44-1", name: "Francisco Garcia" },
      { id: "g44-2", name: "Valentina de Garcia" },
    ],
  },
  {
    id: "g45",
    members: [
      { id: "g45-1", name: "Nataly Alvares" },
      { id: "g45-2", name: "Eduardo Lesmes" },
    ],
  },
];
