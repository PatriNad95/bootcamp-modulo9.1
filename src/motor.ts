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
