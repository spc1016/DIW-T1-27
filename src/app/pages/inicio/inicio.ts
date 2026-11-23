import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavegacionService, PageShellMeta } from '../../navegacion-service';
import { VehiculoService } from '../../vehiculo-service';

export interface PuntoEncuentro {
  recinto: string;
  localidad: string;
  coordenadas: string;
  horarioParque: string;
  mapaSrc: string;
  mapaAlt: string;
}

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  private readonly navegacionService = inject(NavegacionService);
  private readonly vehiculoService = inject(VehiculoService);

  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'PORTADA OFICIAL · REGULARIDAD CLÁSICA ED. I',
    titulo: 'I Rally & Concentración Histórica Classic Motor',
    subtitulo: 'Salida del tramo 3 a las 09:40. Media impuesta: 42 km/h. Buena ruta.',
  };

  protected readonly banner = {
    src: '/img/banner-rally.jpg',
    alt: 'Seis automóviles clásicos participantes en el I Rally Classic Motor estacionados en un puerto de montaña al atardecer: Alpine A110 dorsal 53, Jaguar E-Type dorsal 31, MG TC Midget dorsal 08, Alfa Romeo Giulia Sprint GTA dorsal 42, Lancia Fulvia Coupé dorsal 27 y Porsche 911 Carrera RS dorsal 14.',
    pie: 'Parque cerrado de montaña · Dorsales históricos 1925–1975 · 55,40 km cronometrados',
  };

  protected readonly accesosRapidos = computed(() =>
    this.navegacionService.obtenerTodas('principal').filter((item) => item.ruta !== '/inicio'),
  );

  protected readonly vehiculosDestacados = computed(() =>
    this.vehiculoService.obtenerTodas().slice(0, 3),
  );

  protected readonly puntoEncuentro: PuntoEncuentro = {
    recinto: 'Lonja del Monasterio · Parque Cerrado de Salida',
    localidad: 'San Lorenzo de El Escorial, Madrid',
    coordenadas: '40° 35\' 20" N · 4° 08\' 52" O',
    horarioParque: '08:00 Apertura de parque cerrado · 09:00 Salida dorsal 1',
    mapaSrc: '/img/mapa-encuentro.svg',
    mapaAlt:
      'Mapa esquemático del punto de encuentro en San Lorenzo de El Escorial con acceso por la M-505, zona de parque cerrado y salida hacia TC-01 Puerto de la Cruz Verde.',
  };
}
