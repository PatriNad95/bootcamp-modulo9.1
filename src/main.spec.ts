import {
  calculaTicket,
  obtenerPrecioConIva,
  obtenerPrecioSinIva,
  sacarPorcentajeIva,
} from "./main";

describe("main specs", () => {
  it("Calcula el ticket correctamente", () => {
    const productos: LineaTicket[] = [
      {
        producto: {
          nombre: "Producto1",
          precio: 10,
          tipoIva: "general",
        },
        cantidad: 2,
      },
    ];
    const ticket = calculaTicket(productos);
    expect(ticket.lineas).toHaveLength(productos.length);
    expect(ticket.total.totalSinIva).toBe(20);
  });

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
});
