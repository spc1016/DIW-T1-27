import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { EstadoCarga } from './vehiculo-service';

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

export interface TramoPrograma {
  codigo: string;
  nombre: string;
  estado: string;
  distancia: string;
  media: string;
  controles: string;
}

export interface FilaClasificacion {
  posicion: string;
  dorsal: string;
  equipo: string;
  vehiculo: string;
  desviacion: string;
  esLider: boolean;
  penalizado: boolean;
}

export interface ItinerarioMockData {
  tramos: readonly TramoPrograma[];
  clasificacion: readonly FilaClasificacion[];
}

@Injectable({
  providedIn: 'root',
})
export class NavegacionService {
  private readonly http = inject(HttpClient);
  private readonly coleccion = signal<readonly NavItem[]>([]);
  private readonly tramosInternos = signal<readonly TramoPrograma[]>([]);
  private readonly clasificacionInterna = signal<readonly FilaClasificacion[]>([]);
  private readonly estadoNavegacionInterno = signal<EstadoCarga>('cargando');
  private readonly estadoItinerarioInterno = signal<EstadoCarga>('cargando');

  readonly estadoNavegacion = this.estadoNavegacionInterno.asReadonly();
  readonly estadoItinerario = this.estadoItinerarioInterno.asReadonly();
  readonly tramos = this.tramosInternos.asReadonly();
  readonly clasificacion = this.clasificacionInterna.asReadonly();

  private readonly inicializacion = this.cargarDesdeJson();

  private cargarDesdeJson(): void {
    this.http
      .get<readonly NavItem[]>('/data/navegacion.json')
      .pipe(
        catchError(() => {
          this.estadoNavegacionInterno.set('error');
          return of(null);
        }),
      )
      .subscribe((items) => {
        if (items !== null) {
          this.coleccion.set(items);
          this.estadoNavegacionInterno.set('listo');
        }
      });

    this.http
      .get<ItinerarioMockData>('/data/itinerario.json')
      .pipe(
        catchError(() => {
          this.estadoItinerarioInterno.set('error');
          return of(null);
        }),
      )
      .subscribe((datos) => {
        if (datos !== null) {
          this.tramosInternos.set(datos.tramos ?? []);
          this.clasificacionInterna.set(datos.clasificacion ?? []);
          this.estadoItinerarioInterno.set('listo');
        }
      });
  }

  obtenerTodas(filtro?: string): NavItem[] {
    const lista = this.coleccion();
    if (!filtro) {
      return [...lista];
    }

    const termino = filtro.trim().toLowerCase();
    if (termino === 'principal' || termino === 'itinerario') {
      return lista.filter((item) => item.grupo === termino);
    }

    return lista.filter(
      (item) =>
        item.etiqueta.toLowerCase().includes(termino) ||
        item.descripcion.toLowerCase().includes(termino),
    );
  }

  obtenerPorId(id: number): NavItem | undefined {
    return this.coleccion().find((item) => item.id === id);
  }

  idSiguiente(idActual: number): number {
    const lista = this.coleccion();
    if (lista.length === 0) {
      return 0;
    }

    const indice = lista.findIndex((item) => item.id === idActual);
    if (indice === -1) {
      return lista[0].id;
    }

    const siguienteIndice = (indice + 1) % lista.length;
    return lista[siguienteIndice].id;
  }
}
