import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageShellMeta } from '../../navegacion-service';
import { VehiculoService } from '../../vehiculo-service';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.scss',
})
export class Detalle {
  private readonly router = inject(Router);
  private readonly vehiculoService = inject(VehiculoService);

  readonly id = input.required<string>();

  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'FICHA DE VEHÍCULO · RUTA DINÁMICA :ID',
    titulo: 'Detalle del Vehículo Clásico',
    subtitulo:
      'Placa identificativa esmaltada y lectura reactiva del parámetro de ruta mediante Signals.',
  };

  protected readonly vehiculo = computed(() => {
    const idNumerico = Number(this.id());
    if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
      return undefined;
    }

    return this.vehiculoService.obtenerPorId(idNumerico);
  });

  protected readonly siguienteId = computed(() => {
    const actual = this.vehiculo()?.id ?? 1;
    return this.vehiculoService.idSiguiente(actual);
  });

  protected irASiguiente(): void {
    void this.router.navigate(['/catalogo', this.siguienteId()]);
  }

  protected volverAlCatalogo(): void {
    void this.router.navigateByUrl('/catalogo');
  }
}
