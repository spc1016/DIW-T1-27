import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageShellMeta } from '../../navegacion-service';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.scss',
})
export class Detalle {
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'FICHA DE VEHÍCULO · RUTA DINÁMICA :ID',
    titulo: 'Detalle del Vehículo Clásico',
    subtitulo:
      'Vista esqueleto enlazada mediante parámetro de ruta y Signals (withComponentInputBinding).',
  };

  protected readonly numeroId = computed(() => {
    const valor = Number(this.id());
    return Number.isInteger(valor) && valor > 0 ? valor : null;
  });

  protected readonly tituloFicha = computed(() => {
    const num = this.numeroId();
    return num !== null
      ? `Ficha técnica esqueleto · Dorsal #${num}`
      : `Identificador no numérico recibido: "${this.id()}"`;
  });

  protected volverAlCatalogo(): void {
    void this.router.navigateByUrl('/catalogo');
  }
}
