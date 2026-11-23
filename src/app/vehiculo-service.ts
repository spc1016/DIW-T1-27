import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

export interface VehiculoMuestra {
  id: number;
  dorsal: string;
  modelo: string;
  anio: number;
  categoria: string;
  tono: 'verde' | 'burdeos';
  potencia: string;
  historial: string;
  imagen: string;
  imagenAlt: string;
  resumen: string;
}

export type EstadoCarga = 'cargando' | 'listo' | 'error';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private readonly http = inject(HttpClient);
  private readonly coleccion = signal<readonly VehiculoMuestra[]>([]);
  private readonly estadoCargaInterno = signal<EstadoCarga>('cargando');

  readonly estadoCarga = this.estadoCargaInterno.asReadonly();

  private readonly inicializacion = this.cargarDesdeJson();

  private cargarDesdeJson(): void {
    this.http
      .get<readonly VehiculoMuestra[]>('/data/vehiculos.json')
      .pipe(
        catchError(() => {
          this.estadoCargaInterno.set('error');
          return of(null);
        }),
      )
      .subscribe((datos) => {
        if (datos !== null) {
          this.coleccion.set(datos);
          this.estadoCargaInterno.set('listo');
        }
      });
  }

  obtenerTodas(filtro?: string): VehiculoMuestra[] {
    const lista = this.coleccion();
    if (!filtro) {
      return [...lista];
    }

    const termino = filtro.trim().toLowerCase();
    if (!termino) {
      return [...lista];
    }

    const terminoSinCeros = termino.replace(/^0+/, '');
    return lista.filter((vehiculo) => {
      const dorsalLower = vehiculo.dorsal.toLowerCase();
      const dorsalSinCeros = dorsalLower.replace(/^0+/, '');
      const coincideDorsal =
        dorsalLower.includes(termino) ||
        (terminoSinCeros.length > 0 && dorsalSinCeros === terminoSinCeros);

      return (
        vehiculo.categoria.toLowerCase().includes(termino) ||
        vehiculo.tono.toLowerCase() === termino ||
        vehiculo.modelo.toLowerCase().includes(termino) ||
        String(vehiculo.anio).includes(termino) ||
        coincideDorsal
      );
    });
  }

  obtenerPorId(id: number): VehiculoMuestra | undefined {
    return this.coleccion().find((vehiculo) => vehiculo.id === id);
  }

  idSiguiente(idActual: number): number {
    const lista = this.coleccion();
    if (lista.length === 0) {
      return 0;
    }

    const indice = lista.findIndex((vehiculo) => vehiculo.id === idActual);
    if (indice === -1) {
      return lista[0].id;
    }

    const siguienteIndice = (indice + 1) % lista.length;
    return lista[siguienteIndice].id;
  }
}
