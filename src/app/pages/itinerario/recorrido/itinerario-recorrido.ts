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
}
