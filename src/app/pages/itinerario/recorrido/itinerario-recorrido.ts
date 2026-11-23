import { Component, inject } from '@angular/core';
import { NavegacionService } from '../../../navegacion-service';

@Component({
  selector: 'app-itinerario-recorrido',
  imports: [],
  templateUrl: './itinerario-recorrido.html',
  styleUrl: './itinerario-recorrido.scss',
})
export class ItinerarioRecorrido {
  private readonly navegacionService = inject(NavegacionService);

  protected readonly estadoCarga = this.navegacionService.estadoItinerario;
  protected readonly filas = this.navegacionService.clasificacion;

  protected readonly mapaEtapas = {
    src: '/img/mapa-etapas.svg',
    alt: 'Mapa de etapas del rally: Salida a las 09:00 en San Lorenzo, TC-01 Puerto de la Cruz Verde, TC-02 Subida a Navacerrada en directo, Reagrupamiento a las 13:00, TC-03 Valle del Lozoya y Meta a las 16:30.',
    distanciaTotal: '55.40 km cronometrados',
    controlesTotales: '12 controles horarios',
  };
}
