import { Component } from '@angular/core';

interface HorarioMuestra {
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
  selector: 'app-itinerario-programa',
  imports: [],
  templateUrl: './itinerario-programa.html',
  styleUrl: './itinerario-programa.scss',
})
export class ItinerarioPrograma {
  protected readonly controles: readonly HorarioMuestra[] = [
    {
      vineta: 'CH-00',
      tramo: 'Verificaciones Administrativas y Técnicas',
      distTotal: '000.00 km',
      parcial: '00.00 km',
      media: '—',
      horaTeorica: '08:15:00.0',
      desviacion: '0.0s',
      activo: false,
    },
    {
      vineta: 'CH-01',
      tramo: 'Salida Protocolaria · Parque Cerrado',
      distTotal: '000.00 km',
      parcial: '00.00 km',
      media: '45.0 km/h',
      horaTeorica: '09:00:00.0',
      desviacion: '0.0s',
      activo: true,
    },
    {
      vineta: 'CH-02',
      tramo: 'Reagrupamiento Histórico · Parador Real',
      distTotal: '048.60 km',
      parcial: '12.40 km',
      media: '48.0 km/h',
      horaTeorica: '10:02:15.0',
      desviacion: '-0.2s',
      activo: false,
    },
  ];
}
