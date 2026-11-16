import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageShellMeta } from '../../navegacion-service';

interface VehiculoMuestra {
  id: number;
  nombre: string;
  categoria: string;
  resumen: string;
}

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo {
  private readonly router = inject(Router);

  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'SECCIÓN 02 · PARQUE CERRADO',
    titulo: 'Catálogo de Vehículos Clásicos',
    subtitulo:
      'Vista esqueleto del futuro catálogo interactivo. Aquí se presentarán los vehículos históricos con filtros y acceso a su ficha técnica.',
  };

  protected readonly muestras: readonly VehiculoMuestra[] = [
    {
      id: 1,
      nombre: 'Porsche 911 Carrera RS 2.7 (Muestra)',
      categoria: 'GT HISTÓRICO · 1973',
      resumen:
        'Tarjeta de ejemplo para comprobar la navegación hacia la ruta de detalle /catalogo/1.',
    },
    {
      id: 2,
      nombre: 'Lancia Fulvia Coupé HF (Muestra)',
      categoria: 'TURISMO CLÁSICO · 1972',
      resumen:
        'Tarjeta de ejemplo para comprobar la navegación hacia la ruta de detalle /catalogo/2.',
    },
  ];

  protected abrirDetalle(id: number): void {
    void this.router.navigate(['/catalogo', id]);
  }
}
