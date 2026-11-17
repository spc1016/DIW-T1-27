import { Injectable } from '@angular/core';

export interface NavItem {
  id: number;
  etiqueta: string;
  ruta: string;
  exacto: boolean;
  descripcion: string;
  grupo: 'principal' | 'itinerario';
}

export interface PageShellMeta {
  etiquetaTecnica: string;
  titulo: string;
  subtitulo: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavegacionService {
  private readonly coleccion: readonly NavItem[] = [
    {
      id: 1,
      etiqueta: 'Inicio',
      ruta: '/inicio',
      exacto: true,
      descripcion: 'Portada general, cuadro de instrumentos y salida de la próxima prueba.',
      grupo: 'principal',
    },
    {
      id: 2,
      etiqueta: 'Catálogo',
      ruta: '/catalogo',
      exacto: false,
      descripcion: 'Parque cerrado de vehículos clásicos (1925–1975) y ficha técnica por dorsal.',
      grupo: 'principal',
    },
    {
      id: 3,
      etiqueta: 'Itinerario',
      ruta: '/itinerario',
      exacto: false,
      descripcion: 'Tarjetas de tramo, seguimiento en directo y tabla oficial de clasificación.',
      grupo: 'principal',
    },
    {
      id: 4,
      etiqueta: 'Inscripción',
      ruta: '/inscripcion',
      exacto: false,
      descripcion: 'Carnet de ruta para registro de equipo, vehículo y categoría.',
      grupo: 'principal',
    },
    {
      id: 5,
      etiqueta: 'Guía de Estilo',
      ruta: '/guia-estilo',
      exacto: false,
      descripcion: 'Manual de identidad Ed. I: laca, piel, cromo y tipografía de carrocero.',
      grupo: 'principal',
    },
    {
      id: 6,
      etiqueta: 'Programa y Tramos',
      ruta: '/itinerario/programa',
      exacto: false,
      descripcion: 'Tarjetas de tramo en verde carreras con distancia, media y controles.',
      grupo: 'itinerario',
    },
    {
      id: 7,
      etiqueta: 'Directo y Clasificación',
      ruta: '/itinerario/recorrido',
      exacto: false,
      descripcion: 'Control en vivo en burdeos y tabla general de tiempos a la décima.',
      grupo: 'itinerario',
    },
  ];

  obtenerTodas(filtro?: string): NavItem[] {
    if (!filtro) {
      return [...this.coleccion];
    }

    const termino = filtro.trim().toLowerCase();
    if (termino === 'principal' || termino === 'itinerario') {
      return this.coleccion.filter((item) => item.grupo === termino);
    }

    return this.coleccion.filter(
      (item) =>
        item.etiqueta.toLowerCase().includes(termino) ||
        item.descripcion.toLowerCase().includes(termino),
    );
  }

  obtenerPorId(id: number): NavItem | undefined {
    return this.coleccion.find((item) => item.id === id);
  }

  idSiguiente(idActual: number): number {
    const indice = this.coleccion.findIndex((item) => item.id === idActual);
    if (indice === -1) {
      return this.coleccion[0].id;
    }

    const siguienteIndice = (indice + 1) % this.coleccion.length;
    return this.coleccion[siguienteIndice].id;
  }
}
