import { Component } from '@angular/core';

interface TramoPrograma {
  codigo: string;
  nombre: string;
  estado: string;
  distancia: string;
  media: string;
  controles: string;
}

@Component({
  selector: 'app-itinerario-programa',
  imports: [],
  templateUrl: './itinerario-programa.html',
  styleUrl: './itinerario-programa.scss',
})
export class ItinerarioPrograma {
  protected readonly tramos: readonly TramoPrograma[] = [
    {
      codigo: 'TC-01 · SALIDA 09:00',
      nombre: 'Puerto de la Cruz Verde',
      estado: 'PROGRAMADO',
      distancia: '14.20 km',
      media: '45.0 km/h',
      controles: '03',
    },
    {
      codigo: 'TC-02 · SALIDA 09:40',
      nombre: 'Subida a Navacerrada',
      estado: 'MEDIA IMPUESTA',
      distancia: '18.40 km',
      media: '42.0 km/h',
      controles: '04',
    },
    {
      codigo: 'TC-03 · SALIDA 10:35',
      nombre: 'Valle del Lozoya',
      estado: 'CONTROL SECRETO',
      distancia: '22.80 km',
      media: '48.5 km/h',
      controles: '05',
    },
  ];
}
