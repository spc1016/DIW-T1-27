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
    etiquetaTecnica: 'CARNET DE RUTA · VERIFICACIONES ADMINISTRATIVAS',
    titulo: 'Inscripción de Equipo y Vehículo',
    subtitulo:
      'Presente los datos básicos del equipo. El envío reglamentario completo se habilitará en la fase de formularios reactivos.',
  };
}
