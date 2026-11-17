import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CuadroInstrumentos } from '../../cuadro-instrumentos/cuadro-instrumentos';
import { NavegacionService, PageShellMeta } from '../../navegacion-service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, CuadroInstrumentos],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  private readonly navegacionService = inject(NavegacionService);

  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'PORTADA OFICIAL · REGULARIDAD CLÁSICA ED. I',
    titulo: 'I Rally & Concentración Histórica Classic Motor',
    subtitulo: 'Salida del tramo 3 a las 09:40. Media impuesta: 42 km/h. Buena ruta.',
  };

  protected readonly accesosRapidos = computed(() =>
    this.navegacionService.obtenerTodas('principal').filter((item) => item.ruta !== '/inicio'),
  );
}
