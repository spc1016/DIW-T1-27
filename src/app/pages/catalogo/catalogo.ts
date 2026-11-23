import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageShellMeta } from '../../navegacion-service';
import { VehiculoService } from '../../vehiculo-service';

export type EpocaFiltro = 'TODAS' | 'pre-1960' | '1960-1969' | '1970-1975';

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo {
  private readonly router = inject(Router);
  private readonly vehiculoService = inject(VehiculoService);

  readonly categoria = input<string>();

  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'PARQUE CERRADO · VEHÍCULOS CLÁSICOS 1925–1975',
    titulo: 'Catálogo de Vehículos Admitidos',
    subtitulo:
      'Relación oficial de dorsales verificados por los comisarios técnicos antes de la salida.',
  };

  protected readonly estadoCarga = this.vehiculoService.estadoCarga;
  protected readonly muestras = computed(() => this.vehiculoService.obtenerTodas());

  protected readonly terminoBusqueda = signal('');
  protected readonly categoriaSeleccionada = linkedSignal(
    () => this.categoria()?.trim().toUpperCase() || 'TODAS',
  );
  protected readonly epocaSeleccionada = signal<EpocaFiltro>('TODAS');

  protected readonly categoriasDisponibles = computed(() => {
    const unicas = new Set(this.muestras().map((vehiculo) => vehiculo.categoria));
    return Array.from(unicas).sort((a, b) => a.localeCompare(b, 'es'));
  });

  protected readonly vehiculosFiltrados = computed(() => {
    const categoriaActiva = this.categoriaSeleccionada();
    const epocaActiva = this.epocaSeleccionada();

    return this.vehiculoService.obtenerTodas(this.terminoBusqueda()).filter((vehiculo) => {
      const coincideCategoria =
        categoriaActiva === 'TODAS' ||
        vehiculo.categoria.toUpperCase() === categoriaActiva.toUpperCase();

      const coincideEpoca = this.cumpleEpoca(vehiculo.anio, epocaActiva);
      return coincideCategoria && coincideEpoca;
    });
  });

  protected readonly hayFiltrosActivos = computed(
    () =>
      this.terminoBusqueda().trim().length > 0 ||
      this.categoriaSeleccionada() !== 'TODAS' ||
      this.epocaSeleccionada() !== 'TODAS',
  );

  protected actualizarBusqueda(evento: Event): void {
    const entrada = evento.target as HTMLInputElement;
    this.terminoBusqueda.set(entrada.value);
  }

  protected actualizarCategoria(evento: Event): void {
    const selector = evento.target as HTMLSelectElement;
    this.categoriaSeleccionada.set(selector.value);
  }

  protected actualizarEpoca(evento: Event): void {
    const selector = evento.target as HTMLSelectElement;
    this.epocaSeleccionada.set(selector.value as EpocaFiltro);
  }

  protected limpiarFiltros(): void {
    this.terminoBusqueda.set('');
    this.categoriaSeleccionada.set('TODAS');
    this.epocaSeleccionada.set('TODAS');
  }

  protected abrirDetalle(id: number): void {
    void this.router.navigate(['/catalogo', id]);
  }

  private cumpleEpoca(anio: number, epoca: EpocaFiltro): boolean {
    if (epoca === 'pre-1960') {
      return anio < 1960;
    }
    if (epoca === '1960-1969') {
      return anio >= 1960 && anio <= 1969;
    }
    if (epoca === '1970-1975') {
      return anio >= 1970 && anio <= 1975;
    }
    return true;
  }
}
