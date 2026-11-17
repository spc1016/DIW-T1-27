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
    etiquetaTecnica: 'RUTÓMETRO OFICIAL · TRAMOS Y CLASIFICACIÓN',
    titulo: 'Itinerario, Tramos y Directo',
    subtitulo:
      'Consulte los tramos de regularidad con sus medias impuestas o acceda al seguimiento en directo y la clasificación provisional.',
  };

  protected readonly subEnlaces = computed(() => this.navegacionService.obtenerTodas('itinerario'));
}
