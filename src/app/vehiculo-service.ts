import { Injectable } from '@angular/core';

export interface VehiculoMuestra {
  id: number;
  dorsal: string;
  modelo: string;
  anio: number;
  categoria: string;
  acabadoPlaca: 'verde' | 'burdeos';
  resumen: string;
}

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private readonly coleccion: readonly VehiculoMuestra[] = [
    {
      id: 1,
      dorsal: '014',
      modelo: 'Porsche 911 Carrera RS 2.7',
      anio: 1973,
      categoria: 'GT HISTÓRICO',
      acabadoPlaca: 'verde',
      resumen:
        'Unidad homologada Grupo 4 con instrumentación doble mecánica y carrocería aligerada de serie.',
    },
    {
      id: 2,
      dorsal: '027',
      modelo: 'Lancia Fulvia Coupé 1.6 HF',
      anio: 1972,
      categoria: 'TURISMO CLÁSICO',
      acabadoPlaca: 'burdeos',
      resumen:
        'Configuración Monte-Carlo Historique con tracción delantera, motor V4 estrecho y preparación regularidad.',
    },
    {
      id: 3,
      dorsal: '042',
      modelo: 'Alfa Romeo Giulia Sprint GTA',
      anio: 1967,
      categoria: 'CONCOURS',
      acabadoPlaca: 'burdeos',
      resumen:
        'Ejemplar de carrocería de aluminio Peraluman 25 con acabado de época y cronometraje analógico.',
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
        vehiculo.acabadoPlaca.toLowerCase() === termino ||
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
