import {
  calculaLineasTotales,
  generarTicketFinal,
  obtenerLineasTicket,
} from "./motor";

const productos: LineaTicket[] = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Lasaña",
      precio: 5,
      tipoIva: "superreducidoA",
    },
    cantidad: 1,
  },
];

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const { totalSinIva, totalIva, totalPorTipoIva } =
    calculaLineasTotales(lineasTicket);
  const lineas = obtenerLineasTicket(lineasTicket);
  return generarTicketFinal(lineas, totalSinIva, totalIva, totalPorTipoIva);
};

// Llamamos al método general
const ticket = calculaTicket(productos);
console.log(ticket);
