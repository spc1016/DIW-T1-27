import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CuadroInstrumentos } from '../../cuadro-instrumentos/cuadro-instrumentos';
import { FilaClasificacion, PageShellMeta } from '../../navegacion-service';

interface MuestraColorEd1 {
  rol: string;
  nombre: string;
  hex: string;
  proporcion: string;
  uso: string;
}

interface MuestraTokenAuxiliarEd1 {
  nombre: string;
  valor: string;
  regla: string;
  clase: string;
}

interface MuestraTipografiaEd1 {
  nivel: string;
  familia: string;
  tamano: string;
  clase: string;
  ejemplo: string;
}

@Component({
  selector: 'app-guia-estilo',
  imports: [RouterLink, CuadroInstrumentos],
  templateUrl: './guia-estilo.html',
  styleUrl: './guia-estilo.scss',
})
export class GuiaEstilo {
  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'MANUAL DE IDENTIDAD · ED. I (1925–1975)',
    titulo: 'Guía de estilos · Regularidad Clásica',
    subtitulo:
      'El tiempo exacto, con la elegancia de antes. Sistema de cinco colores, acabado cromado, tipografía de carrocero y biblioteca oficial de componentes.',
  };

  protected readonly paleta: readonly MuestraColorEd1[] = [
    {
      rol: 'Neutro claro',
      nombre: 'Marfil',
      hex: '#EEE8DC',
      proporcion: '52%',
      uso: 'Fondo principal de página y esferas analógicas de reloj.',
    },
    {
      rol: 'Primario',
      nombre: 'Verde carreras',
      hex: '#1F3B2D',
      proporcion: '26%',
      uso: 'Cabeceras, acciones principales y tarjetas de tramos.',
    },
    {
      rol: 'Neutro oscuro',
      nombre: 'Tinta',
      hex: '#141816',
      proporcion: '12%',
      uso: 'Tipografía principal, tripmaster digital y pie de página.',
    },
    {
      rol: 'Acento',
      nombre: 'Cuero coñac',
      hex: '#A36A3A',
      proporcion: '6%',
      uso: 'Etiquetas (eyebrows), estados de foco, detalles de costura y fila líder.',
    },
    {
      rol: 'Acento',
      nombre: 'Burdeos',
      hex: '#6B1F2A',
      proporcion: '4%',
      uso: 'Penalizaciones, alertas, estados fuera de tolerancia y directos.',
    },
  ];

  protected readonly tokensAuxiliares: readonly MuestraTokenAuxiliarEd1[] = [
    {
      nombre: 'Tolerancia óptima (±0,5 s)',
      valor: '#9EC7A8',
      regla: 'Indicador de margen reglamentario sobre fondo tinta #141816 (contraste WCAG AA).',
      clase: 'guia__token--ok',
    },
    {
      nombre: 'Fuera de tolerancia (> ±0,5 s)',
      valor: '#E3A0A8',
      regla: 'Aviso de penalización o desvío sobre fondo tinta #141816 (contraste WCAG AA).',
      clase: 'guia__token--fuera',
    },
    {
      nombre: 'Filete divisorio tinta (14%)',
      valor: 'rgba(20, 24, 22, 0.14)',
      regla: 'Divisores internos y rejillas sutiles de tablas y fichas.',
      clase: 'guia__token--filete',
    },
    {
      nombre: 'Resaltado líder cuero (10%)',
      valor: 'rgba(163, 106, 58, 0.10)',
      regla: 'Tinte exclusivo para destacar la primera posición en clasificación.',
      clase: 'guia__token--lider',
    },
  ];

  protected readonly escalaTipografica: readonly MuestraTipografiaEd1[] = [
    {
      nivel: 'Display',
      familia: 'Bodoni Moda · 40px–88px · 500',
      tamano: '1.05–1.15',
      clase: 'guia__display',
      ejemplo: 'Rally Histórico de Regularidad',
    },
    {
      nivel: 'H2',
      familia: 'Bodoni Moda · 32px–52px',
      tamano: '1.1',
      clase: 'guia__h2',
      ejemplo: 'Laca, piel y metal',
    },
    {
      nivel: 'H3 (Cursiva emocional)',
      familia: 'Bodoni Moda · 26px · italic',
      tamano: '1.15',
      clase: 'guia__h3 titulo-cursiva',
      ejemplo: 'TC-03 · Subida al Puerto de Navacerrada',
    },
    {
      nivel: 'Cuerpo',
      familia: 'Barlow · 16px · 400',
      tamano: '1.55',
      clase: 'guia__cuerpo',
      ejemplo: 'Salida del tramo 3 a las 09:40. Media impuesta: 42 km/h. Buena ruta.',
    },
    {
      nivel: 'Etiqueta + Tabular',
      familia: 'Barlow Condensed · 11px–12px · 600 · +0.18em',
      tamano: '1.25',
      clase: 'etiqueta-ed1 numero-tabular',
      ejemplo: 'DORSAL 14 · PARCIAL 14.20 KM · DESVIACIÓN +0.1 S',
    },
  ];

  protected readonly clasificacion: readonly FilaClasificacion[] = [
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
