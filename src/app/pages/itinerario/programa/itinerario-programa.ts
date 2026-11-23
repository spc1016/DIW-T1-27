import { Component, inject } from '@angular/core';
import { NavegacionService } from '../../../navegacion-service';

@Component({
  selector: 'app-itinerario-programa',
  imports: [],
  templateUrl: './itinerario-programa.html',
  styleUrl: './itinerario-programa.scss',
})
export class ItinerarioPrograma {
  private readonly navegacionService = inject(NavegacionService);

  protected readonly estadoCarga = this.navegacionService.estadoItinerario;
  protected readonly tramos = this.navegacionService.tramos;
}
