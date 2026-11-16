import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageShellMeta } from '../../navegacion-service';

@Component({
  selector: 'app-inscripcion',
  imports: [RouterLink],
  templateUrl: './inscripcion.html',
  styleUrl: './inscripcion.scss',
})
export class Inscripcion {
  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'SECCIÓN 04 · VERIFICACIONES ADMINISTRATIVAS',
    titulo: 'Inscripción de Participantes',
    subtitulo:
      'Vista esqueleto reservada para el futuro formulario de inscripción de piloto, copiloto y vehículo histórico.',
  };
}
