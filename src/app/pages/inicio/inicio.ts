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
    etiquetaTecnica: 'SECCIÓN 01 · PORTADA OFICIAL',
    titulo: 'I Rally & Concentración Histórica Classic Motor',
    subtitulo:
      'Esqueleto inicial del portal oficial. Desde aquí puedes recorrer las secciones principales del evento mientras preparamos cada módulo en detalle.',
  };

  protected readonly accesosRapidos = computed(() =>
    this.navegacionService.obtenerTodas('principal').filter((item) => item.ruta !== '/inicio'),
  );
}
