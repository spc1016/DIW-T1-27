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
      descripcion: 'Portada general del I Rally & Concentración Histórica Classic Motor.',
      grupo: 'principal',
    },
    {
      id: 2,
      etiqueta: 'Catálogo',
      ruta: '/catalogo',
      exacto: false,
      descripcion: 'Esqueleto de la galería de vehículos clásicos y acceso a fichas técnicas.',
      grupo: 'principal',
    },
    {
      id: 3,
      etiqueta: 'Itinerario',
      ruta: '/itinerario',
      exacto: false,
      descripcion: 'Programa oficial por jornadas, horarios y recorrido de las etapas.',
      grupo: 'principal',
    },
    {
      id: 4,
      etiqueta: 'Inscripción',
      ruta: '/inscripcion',
      exacto: false,
      descripcion: 'Sección base reservada para el registro de participantes y vehículos.',
      grupo: 'principal',
    },
    {
      id: 5,
      etiqueta: 'Guía de Estilo',
      ruta: '/guia-estilo',
      exacto: false,
      descripcion: 'Sistema visual base Historic Rally & Classic Chronometer del club.',
      grupo: 'principal',
    },
    {
      id: 6,
      etiqueta: 'Programa Oficial',
      ruta: '/itinerario/programa',
      exacto: false,
      descripcion: 'Subvista base para horarios de verificación, salida y entrega de trofeos.',
      grupo: 'itinerario',
    },
    {
      id: 7,
      etiqueta: 'Recorrido y Tramos',
      ruta: '/itinerario/recorrido',
      exacto: false,
      descripcion: 'Subvista base para la secuencia de tramos cronometrados y paradas.',
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
