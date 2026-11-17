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
    etiquetaTecnica: 'CONTROL HORARIO · FUERA DE RECORRIDO',
    titulo: 'Página no encontrada',
    subtitulo:
      'El punto de paso solicitado no figura en el rutómetro oficial. Retome el itinerario desde la portada.',
  };

  protected volverAlInicio(): void {
    void this.router.navigateByUrl('/inicio');
  }
}
