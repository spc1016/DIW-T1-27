import { Component, computed, signal } from '@angular/core';

export interface LecturaCrono {
  id: 'ideal' | 'tolerancia' | 'fuera';
  etiqueta: string;
  parcialKm: string;
  mediaImpuesta: string;
  mediaReal: string;
  desviacionSeg: string;
  enTolerancia: boolean;
  anguloAguja: number;
}

@Component({
  selector: 'app-cuadro-instrumentos',
  imports: [],
  templateUrl: './cuadro-instrumentos.html',
  styleUrl: './cuadro-instrumentos.scss',
})
export class CuadroInstrumentos {
  protected readonly lecturas: readonly LecturaCrono[] = [
    {
      id: 'ideal',
      etiqueta: '0,0 s · Ideal',
      parcialKm: '14.20',
      mediaImpuesta: '42.0',
      mediaReal: '42.0',
      desviacionSeg: '0.0',
      enTolerancia: true,
      anguloAguja: 0,
    },
    {
      id: 'tolerancia',
      etiqueta: '-0,2 s · En margen',
      parcialKm: '14.45',
      mediaImpuesta: '42.0',
      mediaReal: '42.2',
      desviacionSeg: '-0.2',
      enTolerancia: true,
      anguloAguja: -22,
    },
    {
      id: 'fuera',
      etiqueta: '+0,9 s · Penalización',
      parcialKm: '14.78',
      mediaImpuesta: '42.0',
      mediaReal: '41.1',
      desviacionSeg: '+0.9',
      enTolerancia: false,
      anguloAguja: 56,
    },
  ];

  protected readonly lecturaId = signal<LecturaCrono['id']>('ideal');

  protected readonly lecturaActual = computed(
    () => this.lecturas.find((item) => item.id === this.lecturaId()) ?? this.lecturas[0],
  );

  protected seleccionarLectura(id: LecturaCrono['id']): void {
    this.lecturaId.set(id);
  }
}
