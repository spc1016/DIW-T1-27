import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavegacionService, PageShellMeta } from '../../navegacion-service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  private readonly navegacionService = inject(NavegacionService);

  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'SECCIÓN 01 · PORTADA CONCOURS EDITION',
    titulo: 'I Rally & Concentración Histórica Classic Motor',
    subtitulo:
      'Tablero central y rutómetro base del evento. Navega por cada módulo desde la cabina de mando respetando la precisión clásica de regularidad.',
  };

  protected readonly accesosRapidos = computed(() =>
    this.navegacionService.obtenerTodas('principal').filter((item) => item.ruta !== '/inicio'),
  );
}
