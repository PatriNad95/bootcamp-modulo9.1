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
  const lineas: ResultadoLineaTicket[] = [];
  let totalSinIva = 0;
  let totalIva = 0;
  const totalPorTipoIva: { [key in TipoIva]: number } = {
    general: 0,
    reducido: 0,
    superreducidoA: 0,
    superreducidoB: 0,
    superreducidoC: 0,
    sinIva: 0,
  };

  // Se recorre cada línea del ticket
  lineasTicket.forEach((linea) => {
    const { producto, cantidad } = linea;
    const precioSinIva = obtenerPrecioSinIva(producto.precio, cantidad);
    const precioConIva = obtenerPrecioConIva(precioSinIva, producto.tipoIva);

    // Sumar al total sin IVA
    totalSinIva += precioSinIva;

    // Sumar al total de IVA y por cada tipo de IVA
    const iva = precioConIva - precioSinIva;
    totalIva += iva;
    totalPorTipoIva[producto.tipoIva] += iva;

    // Obtenemos la línea del ticket
    const lineaTicket: ResultadoLineaTicket = {
      nombre: producto.nombre,
      cantidad: cantidad,
      precioSinIva: precioSinIva,
      tipoIva: producto.tipoIva,
      precioConIva: precioConIva,
    };

    lineas.push(lineaTicket);
  });

  // Calculo del total con el iva
  const totalConIva = totalSinIva + totalIva;

  // Generamos el ticket final
  const ticketFinal: TicketFinal = {
    lineas: lineas,
    total: {
      totalSinIva: Number(totalSinIva.toFixed(2)),
      totalConIva: Number(totalConIva.toFixed(2)),
      totalIva: Number(totalIva.toFixed(2)),
    },
    desgloseIva: Object.entries(totalPorTipoIva).map(([tipoIva, cuantia]) => ({
      tipoIva: tipoIva as TipoIva,
      cuantia: Number(cuantia.toFixed(2)),
    })),
  };

  return ticketFinal;
};

// Llamamos al método general
const ticket = calculaTicket(productos);
console.log(ticket);

export function obtenerPrecioSinIva(precio: number, cantidad: number): number {
  return precio * cantidad;
}

export function obtenerPrecioConIva(precio: number, tipoIva: TipoIva): number {
  const porcentajeIva = sacarPorcentajeIva(tipoIva);
  const iva = (precio * porcentajeIva) / 100;
  return precio + iva;
}

export function sacarPorcentajeIva(tipoIva: TipoIva): number {
  switch (tipoIva) {
    case "general":
      return 21;
    case "reducido":
      return 10;
    case "superreducidoA":
      return 4;
    case "superreducidoB":
      return 3;
    case "superreducidoC":
      return 2;
    case "sinIva":
      return 0;
    default:
      return 0;
  }
}
