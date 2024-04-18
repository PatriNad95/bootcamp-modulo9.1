import { calculaTicket } from "./main";

describe("main specs", () => {
  it("calcula ticket correctamente", () => {
    const lineasTicket: LineaTicket[] = [
      {
        producto: { nombre: "Producto1", precio: 10, tipoIva: "general" },
        cantidad: 2,
      },
      {
        producto: { nombre: "Producto2", precio: 15, tipoIva: "reducido" },
        cantidad: 1,
      },
    ];
    const ticketFinal = calculaTicket(lineasTicket);
    expect(ticketFinal.lineas).toHaveLength(2);
    expect(ticketFinal.total.totalSinIva).toBe(35);
    expect(ticketFinal.total.totalIva).toBeCloseTo(5.7);
    expect(ticketFinal.total.totalConIva).toBeCloseTo(40.7);
    expect(ticketFinal.desgloseIva).toEqual([
      { tipoIva: "general", cuantia: 4.2 },
      { tipoIva: "reducido", cuantia: 1.5 },
      { tipoIva: "superreducidoA", cuantia: 0 },
      { tipoIva: "superreducidoB", cuantia: 0 },
      { tipoIva: "superreducidoC", cuantia: 0 },
      { tipoIva: "sinIva", cuantia: 0 },
    ]);
  });
});
