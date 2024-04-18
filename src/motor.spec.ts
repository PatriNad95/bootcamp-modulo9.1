import {
  calculaLineasTotales,
  generarTicketFinal,
  obtenerLineasTicket,
  obtenerPrecioConIva,
  obtenerPrecioSinIva,
  sacarPorcentajeIva,
} from "./motor";

describe("motor specs", () => {
  it("Obtiene el precio sin IVA correctamente", () => {
    const precioSinIva = obtenerPrecioSinIva(10, 3);
    expect(precioSinIva).toBe(30);
  });

  it("Obtiene el precio con IVA correctamente", () => {
    const precioConIva = obtenerPrecioConIva(30, "reducido");
    expect(precioConIva).toBe(33);
  });

  it("Saca el porcentaje de IVA correctamente", () => {
    const porcentajeIva = sacarPorcentajeIva("general");
    expect(porcentajeIva).toBe(21);
  });

  it("Saca el porcentaje de IVA correctamente", () => {
    const porcentajeIva = sacarPorcentajeIva("reducido");
    expect(porcentajeIva).toBe(10);
  });

  it("calcula los totales correctamente", () => {
    const lineasTicket: LineaTicket[] = [
      {
        producto: { nombre: "Producto1", precio: 10, tipoIva: "general" },
        cantidad: 1,
      },
      {
        producto: { nombre: "Producto2", precio: 15, tipoIva: "reducido" },
        cantidad: 1,
      },
    ];
    const { totalSinIva, totalIva, totalPorTipoIva } =
      calculaLineasTotales(lineasTicket);
    expect(totalSinIva).toBe(25);
    expect(totalIva).toBeCloseTo(3.6);
    expect(totalPorTipoIva["general"]).toBeCloseTo(2.1);
    expect(totalPorTipoIva["reducido"]).toBeCloseTo(1.5);
  });

  it("genera las lineas de ticket correctamente", () => {
    const lineasTicket: LineaTicket[] = [
      {
        producto: { nombre: "Producto1", precio: 10, tipoIva: "general" },
        cantidad: 1,
      },
      {
        producto: { nombre: "Producto2", precio: 15, tipoIva: "reducido" },
        cantidad: 1,
      },
    ];
    const lineas = obtenerLineasTicket(lineasTicket);
    expect(lineas).toHaveLength(2);
    expect(lineas[0]).toEqual({
      nombre: "Producto1",
      cantidad: 1,
      precioSinIva: 10,
      tipoIva: "general",
      precioConIva: 12.1,
    });
    expect(lineas[1]).toEqual({
      nombre: "Producto2",
      cantidad: 1,
      precioSinIva: 15,
      tipoIva: "reducido",
      precioConIva: 16.5,
    });
  });

  it("genera el ticket final correctamente", () => {
    const lineas: ResultadoLineaTicket[] = [
      {
        nombre: "Producto1",
        cantidad: 2,
        precioSinIva: 20,
        tipoIva: "general",
        precioConIva: 24.2,
      },
      {
        nombre: "Producto2",
        cantidad: 1,
        precioSinIva: 15,
        tipoIva: "reducido",
        precioConIva: 16.5,
      },
    ];
    const totalSinIva = 35;
    const totalIva = 7.05;
    const totalPorTipoIva = {
      general: 2.1,
      reducido: 1.5,
      superreducidoA: 0,
      superreducidoB: 0,
      superreducidoC: 0,
      sinIva: 0,
    };
    const ticketFinal = generarTicketFinal(
      lineas,
      totalSinIva,
      totalIva,
      totalPorTipoIva
    );
    expect(ticketFinal.lineas).toEqual(lineas);
    expect(ticketFinal.total).toEqual({
      totalSinIva: 35,
      totalConIva: 42.05, // 35 + 7.05
      totalIva: 7.05,
    });
    expect(ticketFinal.desgloseIva).toEqual([
      { tipoIva: "general", cuantia: 2.1 },
      { tipoIva: "reducido", cuantia: 1.5 },
      { tipoIva: "superreducidoA", cuantia: 0 },
      { tipoIva: "superreducidoB", cuantia: 0 },
      { tipoIva: "superreducidoC", cuantia: 0 },
      { tipoIva: "sinIva", cuantia: 0 },
    ]);
  });
});
