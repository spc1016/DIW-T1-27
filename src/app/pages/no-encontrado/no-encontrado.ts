import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageShellMeta } from '../../navegacion-service';

@Component({
  selector: 'app-no-encontrado',
  imports: [RouterLink],
  templateUrl: './no-encontrado.html',
  styleUrl: './no-encontrado.scss',
})
export class NoEncontrado {
  private readonly router = inject(Router);

  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'ERROR 404 · RUTA NO RECONOCIDA',
    titulo: 'Página no encontrada',
    subtitulo:
      'La dirección solicitada no corresponde a ninguna sección del portal del I Rally & Concentración Histórica Classic Motor.',
  };

  protected volverAlInicio(): void {
    void this.router.navigateByUrl('/inicio');
  }
}
