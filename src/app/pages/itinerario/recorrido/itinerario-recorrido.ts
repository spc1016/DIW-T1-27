import { Component } from '@angular/core';

interface TramoRecorrido {
  vineta: string;
  tramo: string;
  distTotal: string;
  parcial: string;
  media: string;
  horaTeorica: string;
  desviacion: string;
  activo: boolean;
}

@Component({
  selector: 'app-itinerario-recorrido',
  imports: [],
  templateUrl: './itinerario-recorrido.html',
  styleUrl: './itinerario-recorrido.scss',
})
export class ItinerarioRecorrido {
  protected readonly tramos: readonly TramoRecorrido[] = [
    {
      vineta: 'TC-01',
      tramo: 'Puerto de la Cruz Verde · Enlace Norte',
      distTotal: '018.40 km',
      parcial: '06.20 km',
      media: '49.8 km/h',
      horaTeorica: '09:22:10.4',
      desviacion: '0.0s',
      activo: false,
    },
    {
      vineta: 'TC-02',
      tramo: 'Col de Turini · Sector Regularidad',
      distTotal: '034.90 km',
      parcial: '16.50 km',
      media: '48.5 km/h',
      horaTeorica: '09:42:35.0',
      desviacion: '-0.1s',
      activo: true,
    },
  ];
}
