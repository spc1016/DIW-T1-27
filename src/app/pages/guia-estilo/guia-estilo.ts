import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageShellMeta } from '../../navegacion-service';

interface MuestraColor {
  nombre: string;
  hex: string;
  token: string;
  uso: string;
}

@Component({
  selector: 'app-guia-estilo',
  imports: [RouterLink],
  templateUrl: './guia-estilo.html',
  styleUrl: './guia-estilo.scss',
})
export class GuiaEstilo {
  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'SECCIÓN 05 · SISTEMA DE DISEÑO',
    titulo: 'Guía de Estilo del Club',
    subtitulo:
      'Referencia visual base del sistema Historic Rally & Classic Chronometer definida en _variables.scss para todo el proyecto.',
  };

  protected readonly paleta: readonly MuestraColor[] = [
    {
      nombre: 'British Racing Green',
      hex: '#0B3B24',
      token: '$color-primary-container',
      uso: 'Cabecera, acciones primarias y acentos institucionales',
    },
    {
      nombre: 'Saddle Leather / Cognac',
      hex: '#8B5A2B',
      token: '$color-secondary-leather',
      uso: 'Botones secundarios, enlace activo y bordes cálidos',
    },
    {
      nombre: 'Brushed Steel',
      hex: '#7E8B9B',
      token: '$color-brushed-steel',
      uso: 'Biselados metálicos y etiquetas técnicas',
    },
    {
      nombre: 'Vintage Dial Charcoal',
      hex: '#1A1D1A',
      token: '$color-dial-charcoal',
      uso: 'Pie de página y contraste editorial',
    },
    {
      nombre: 'Aged Parchment',
      hex: '#F9F6F0',
      token: '$color-parchment-light',
      uso: 'Fondo base de lienzo evitando blanco puro',
    },
  ];
}
