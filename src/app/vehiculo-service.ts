import { Injectable } from '@angular/core';

export interface VehiculoMuestra {
  id: number;
  dorsal: string;
  modelo: string;
  anio: number;
  categoria: string;
  tono: 'verde' | 'burdeos';
  resumen: string;
}

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private readonly coleccion: readonly VehiculoMuestra[] = [
    {
      id: 1,
      dorsal: '14',
      modelo: 'Porsche 911 Carrera RS 2.7',
      anio: 1973,
      categoria: 'GRAN TURISMO',
      tono: 'verde',
      resumen:
        'Unidad homologada con doble cronometraje mecánico y pasaporte técnico histórico vigente.',
    },
    {
      id: 2,
      dorsal: '27',
      modelo: 'Lancia Fulvia Coupé 1.6 HF',
      anio: 1972,
      categoria: 'TURISMO HISTÓRICO',
      tono: 'burdeos',
      resumen:
        'Preparación de regularidad clásica para tramos de montaña con media impuesta de 42 km/h.',
    },
    {
      id: 3,
      dorsal: '42',
      modelo: 'Alfa Romeo Giulia Sprint GTA',
      anio: 1967,
      categoria: 'SPORT CLÁSICO',
      tono: 'verde',
      resumen:
        'Carrocería ligera de época verificada por los comisarios técnicos en parque cerrado.',
    },
  ];

  obtenerTodas(filtro?: string): VehiculoMuestra[] {
    if (!filtro) {
      return [...this.coleccion];
    }

    const termino = filtro.trim().toLowerCase();
    return this.coleccion.filter(
      (vehiculo) =>
        vehiculo.categoria.toLowerCase().includes(termino) ||
        vehiculo.tono.toLowerCase() === termino ||
        vehiculo.modelo.toLowerCase().includes(termino),
    );
  }

  obtenerPorId(id: number): VehiculoMuestra | undefined {
    return this.coleccion.find((vehiculo) => vehiculo.id === id);
  }

  idSiguiente(idActual: number): number {
    const indice = this.coleccion.findIndex((vehiculo) => vehiculo.id === idActual);
    if (indice === -1) {
      return this.coleccion[0].id;
    }

    const siguienteIndice = (indice + 1) % this.coleccion.length;
    return this.coleccion[siguienteIndice].id;
  }
}
