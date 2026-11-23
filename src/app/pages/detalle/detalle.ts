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
    etiquetaTecnica: 'FICHA DE PARQUE CERRADO · RUTA :ID',
    titulo: 'Ficha Técnica de Dorsal',
    subtitulo: 'Lectura reactiva del dorsal asignado y estado de verificación técnica.',
  };

  protected readonly estadoCarga = this.vehiculoService.estadoCarga;

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
