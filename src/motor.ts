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

export function obtenerLineasTicket(
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] {
  const lineas: ResultadoLineaTicket[] = [];

  lineasTicket.forEach((linea) => {
    const { producto, cantidad } = linea;
    const precioSinIva = obtenerPrecioSinIva(producto.precio, cantidad);
    const precioConIva = obtenerPrecioConIva(precioSinIva, producto.tipoIva);

    const lineaTicket: ResultadoLineaTicket = {
      nombre: producto.nombre,
      cantidad,
      precioSinIva,
      tipoIva: producto.tipoIva,
      precioConIva,
    };

    lineas.push(lineaTicket);
  });

  return lineas;
}

function sumarTotal(total: number, precio: number): number {
  // Sumar al total sin IVA
  return (total += precio);
}

function setLineaTicket(
  producto: Producto,
  cantidad: number,
  precioSinIva: number,
  precioConIva: number
): ResultadoLineaTicket {
  return {
    nombre: producto.nombre,
    cantidad: cantidad,
    precioSinIva: precioSinIva,
    tipoIva: producto.tipoIva,
    precioConIva: precioConIva,
  };
}

export function calculaLineasTotales(lineasTicket: LineaTicket[]) {
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

  lineasTicket.forEach((linea) => {
    const { producto, cantidad } = linea;
    const precioSinIva = obtenerPrecioSinIva(producto.precio, cantidad);
    const precioConIva = obtenerPrecioConIva(precioSinIva, producto.tipoIva);

    totalSinIva += precioSinIva;
    const iva = precioConIva - precioSinIva;
    totalIva += iva;
    totalPorTipoIva[producto.tipoIva] += iva;
  });

  return { totalSinIva, totalIva, totalPorTipoIva };
}

const generateLineResults = (lineasTicket: LineaTicket[]) => {
  const lineas: ResultadoLineaTicket[] = [];

  lineasTicket.forEach((linea) => {
    const { producto, cantidad } = linea;
    const precioSinIva = obtenerPrecioSinIva(producto.precio, cantidad);
    const precioConIva = obtenerPrecioConIva(precioSinIva, producto.tipoIva);

    const lineaTicket: ResultadoLineaTicket = {
      nombre: producto.nombre,
      cantidad,
      precioSinIva,
      tipoIva: producto.tipoIva,
      precioConIva,
    };

    lineas.push(lineaTicket);
  });

  return lineas;
};

export function generarTicketFinal(
  lineas: ResultadoLineaTicket[],
  totalSinIva: number,
  totalIva: number,
  totalPorTipoIva: { [key in TipoIva]: number }
): TicketFinal {
  const totalConIva = totalSinIva + totalIva;

  const ticketFinal: TicketFinal = {
    lineas,
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
}
