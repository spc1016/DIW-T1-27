import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageShellMeta } from '../../navegacion-service';

interface MuestraColorConcours {
  nombre: string;
  hex: string;
  token: string;
  proporcion: string;
  uso: string;
}

interface MuestraTipografia {
  nombre: string;
  especificacion: string;
  clase: string;
  ejemplo: string;
}

interface TramoMuestra {
  vineta: string;
  tramo: string;
  distTotal: string;
  parcial: string;
  media: string;
  horaTeorica: string;
  desviacion: string;
  activo: boolean;
}

type EstadoVernier = 'optimo' | 'adelanto' | 'penalizacion';

@Component({
  selector: 'app-guia-estilo',
  imports: [RouterLink],
  templateUrl: './guia-estilo.html',
  styleUrl: './guia-estilo.scss',
})
export class GuiaEstilo {
  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'SECCIÓN 05 · CONCOURS EDITION V2.0.0',
    titulo: 'Guía de Estilo del Club',
    subtitulo:
      'Muestrario vivo del sistema Historic Rally & Classic Chronometer: proporción cromática 60/25/10/5, tipografía tabular, acabados físicos y componentes de regularidad.',
  };

  protected readonly estadoVernier = signal<EstadoVernier>('optimo');
  protected readonly testigoActivo = signal(true);

  protected readonly etiquetaVernier = computed(() => {
    switch (this.estadoVernier()) {
      case 'adelanto':
        return '-0.4s · ADELANTO';
      case 'penalizacion':
        return '+0.8s · PENALIZACIÓN';
      default:
        return '0.0s · REGULARIDAD ÓPTIMA';
    }
  });

  protected readonly paleta: readonly MuestraColorConcours[] = [
    {
      nombre: 'Papel de Rutómetro',
      hex: '#F6F3EC',
      token: '$color-surface',
      proporcion: '60% BASE',
      uso: 'Lienzo principal ahuesado que reduce fatiga visual bajo luz solar en cabina.',
    },
    {
      nombre: 'Dial Jaeger Obsidian',
      hex: '#141715',
      token: '$color-dial-obsidian',
      proporcion: '25% ESTRUCTURA',
      uso: 'Esferas de cronómetro oscuro, tinta carbón y pie institucional.',
    },
    {
      nombre: 'Cromo Cepillado',
      hex: '#B8C0C8',
      token: '$color-chrome-mid',
      proporcion: '25% ESTRUCTURA',
      uso: 'Biseles metálicos, remaches de dorsal y filetes de instrumentación.',
    },
    {
      nombre: 'British Racing Green',
      hex: '#0A3622',
      token: '$color-primary',
      proporcion: '10% PRIMARIO',
      uso: 'Cabecera principal, placas esmaltadas, pulsadores de validación y fila activa.',
    },
    {
      nombre: 'Cuero Cognac (Connolly)',
      hex: '#824B24',
      token: '$color-secondary',
      proporcion: '5% NOBLE',
      uso: 'Navegación secundaria activa, carpetas reglamentarias y pespunte cosido.',
    },
    {
      nombre: 'Vintage Bordeaux (Oxblood)',
      hex: '#631D26',
      token: '$color-bordeaux',
      proporcion: '5% NOBLE',
      uso: 'Distinciones Concours, placas especiales, alertas de penalización y control 404.',
    },
    {
      nombre: 'Latón Calibrado',
      hex: '#B58938',
      token: '$color-brass-gold',
      proporcion: 'DETALLE',
      uso: 'Marcadores centrales de cero vernier, corona del emblema e indicador de foco.',
    },
  ];

  protected readonly escalasTipograficas: readonly MuestraTipografia[] = [
    {
      nombre: 'display-hero / headline-lg',
      especificacion: 'Playfair Display · 56px / 38px · 700 / 600',
      clase: 'guia__tipo--hero',
      ejemplo: 'TC-04: Col de Turini',
    },
    {
      nombre: 'headline-md / headline-sm',
      especificacion: 'Playfair Display · 26px / 20px · 600',
      clase: 'guia__tipo--titulo',
      ejemplo: 'Verificaciones Técnicas y Parque Cerrado',
    },
    {
      nombre: 'chrono-hero / chrono-gauge',
      especificacion: 'Space Mono · 48px / 28px · 700 · "tnum" 1, "zero" 1',
      clase: 'guia__tipo--crono numero-tabular',
      ejemplo: '00:42:18.0',
    },
    {
      nombre: 'body-lg / body-md',
      especificacion: 'Chivo · 17px / 14px · 400',
      clase: 'guia__tipo--cuerpo',
      ejemplo: 'Mantener media impuesta de 48.5 km/h hasta el Control Horario CH-03.',
    },
    {
      nombre: 'label-engraved / label-micro',
      especificacion: 'Space Mono · 11px / 9px · 700 · 0.12em–0.14em uppercase',
      clase: 'etiqueta-grabada',
      ejemplo: 'TIEMPO IDEAL · DESVIACIÓN · ODO PARCIAL 014.20 KM',
    },
  ];

  protected readonly filasRutometro: readonly TramoMuestra[] = [
    {
      vineta: 'CH-01',
      tramo: 'Salida Parque Cerrado · Plaza Mayor',
      distTotal: '000.00 km',
      parcial: '00.00 km',
      media: '45.0 km/h',
      horaTeorica: '09:00:00.0',
      desviacion: '0.0s',
      activo: false,
    },
    {
      vineta: 'TC-02',
      tramo: 'Puerto de Navacerrada · Vertiente Sur',
      distTotal: '014.20 km',
      parcial: '03.85 km',
      media: '48.5 km/h',
      horaTeorica: '09:17:34.2',
      desviacion: '-0.1s',
      activo: true,
    },
  ];

  protected cambiarEstadoVernier(estado: EstadoVernier): void {
    this.estadoVernier.set(estado);
  }

  protected alternarTestigo(): void {
    this.testigoActivo.update((activo) => !activo);
  }
}
