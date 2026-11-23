import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageShellMeta } from '../../navegacion-service';
import { VehiculoService } from '../../vehiculo-service';

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo {
  private readonly router = inject(Router);
  private readonly vehiculoService = inject(VehiculoService);

  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'PARQUE CERRADO · VEHÍCULOS CLÁSICOS 1925–1975',
    titulo: 'Catálogo de Vehículos Admitidos',
    subtitulo:
      'Relación oficial de dorsales verificados por los comisarios técnicos antes de la salida.',
  };

  protected readonly estadoCarga = this.vehiculoService.estadoCarga;
  protected readonly muestras = computed(() => this.vehiculoService.obtenerTodas());

  protected abrirDetalle(id: number): void {
    void this.router.navigate(['/catalogo', id]);
  }
}
