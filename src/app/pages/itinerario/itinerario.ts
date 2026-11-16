import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavegacionService, PageShellMeta } from '../../navegacion-service';

@Component({
  selector: 'app-itinerario',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './itinerario.html',
  styleUrl: './itinerario.scss',
})
export class Itinerario {
  private readonly navegacionService = inject(NavegacionService);

  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'SECCIÓN 03 · RUTÓMETRO OFICIAL',
    titulo: 'Itinerario y Horarios del Rally',
    subtitulo:
      'Sección con subrutas anidadas (children) y salida secundaria para alternar entre el programa oficial y los tramos del recorrido.',
  };

  protected readonly subEnlaces = computed(() => this.navegacionService.obtenerTodas('itinerario'));
}
