import { Component } from '@angular/core';

interface FilaClasificacion {
  posicion: string;
  dorsal: string;
  equipo: string;
  vehiculo: string;
  desviacion: string;
  esLider: boolean;
  penalizado: boolean;
}

@Component({
  selector: 'app-itinerario-recorrido',
  imports: [],
  templateUrl: './itinerario-recorrido.html',
  styleUrl: './itinerario-recorrido.scss',
})
export class ItinerarioRecorrido {
  protected readonly filas: readonly FilaClasificacion[] = [
    {
      posicion: '1',
      dorsal: '14',
      equipo: 'M. Valdés / C. Serrano',
      vehiculo: 'Porsche 911 Carrera RS',
      desviacion: '0.2 s',
      esLider: true,
      penalizado: false,
    },
    {
      posicion: '2',
      dorsal: '27',
      equipo: 'A. Prieto / E. Navarro',
      vehiculo: 'Lancia Fulvia Coupé HF',
      desviacion: '0.5 s',
      esLider: false,
      penalizado: false,
    },
    {
      posicion: '3',
      dorsal: '42',
      equipo: 'J. Morales / R. Gil',
      vehiculo: 'Alfa Romeo Giulia GTA',
      desviacion: '1.8 s',
      esLider: false,
      penalizado: true,
    },
  ];
}
