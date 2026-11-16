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
    etiquetaTecnica: 'SECCIÓN 02 · PARQUE CERRADO CONCOURS',
    titulo: 'Catálogo de Vehículos Clásicos',
    subtitulo:
      'Muestras con biseles cromados y placas de dorsal con remaches metálicos para validar la navegación hacia las fichas técnicas.',
  };

  protected readonly muestras = computed(() => this.vehiculoService.obtenerTodas());

  protected abrirDetalle(id: number): void {
    void this.router.navigate(['/catalogo', id]);
  }
}
