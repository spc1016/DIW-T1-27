import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { ItinerarioMockData, NavItem } from './navegacion-service';
import { VehiculoMuestra } from './vehiculo-service';

const MOCK_VEHICULOS: readonly VehiculoMuestra[] = [
  {
    id: 1,
    dorsal: '14',
    modelo: 'Porsche 911 Carrera RS 2.7',
    anio: 1973,
    categoria: 'GRAN TURISMO',
    tono: 'verde',
    potencia: '210 CV · 2.687 cc',
    historial: 'Chasis serie Touring homologado FIA Grupo 4.',
    imagen: '/img/vehiculos/porsche-911-rs.svg',
    imagenAlt: 'Ilustración Porsche 911 Carrera RS 2.7 dorsal 14',
    resumen: 'Unidad homologada con doble cronometraje mecánico.',
  },
  {
    id: 2,
    dorsal: '27',
    modelo: 'Lancia Fulvia Coupé 1.6 HF',
    anio: 1972,
    categoria: 'TURISMO HISTÓRICO',
    tono: 'burdeos',
    potencia: '115 CV · 1.584 cc',
    historial: 'Preparación Fanalone de tracción delantera.',
    imagen: '/img/vehiculos/lancia-fulvia-hf.svg',
    imagenAlt: 'Ilustración Lancia Fulvia Coupé 1.6 HF dorsal 27',
    resumen: 'Preparación de regularidad clásica para tramos de montaña.',
  },
  {
    id: 3,
    dorsal: '42',
    modelo: 'Alfa Romeo Giulia Sprint GTA',
    anio: 1967,
    categoria: 'SPORT CLÁSICO',
    tono: 'verde',
    potencia: '115 CV · 1.570 cc',
    historial: 'Carrocería en aleación ligera Peraluman 25.',
    imagen: '/img/vehiculos/alfa-giulia-gta.svg',
    imagenAlt: 'Ilustración Alfa Romeo Giulia Sprint GTA dorsal 42',
    resumen: 'Carrocería ligera de época verificada por comisarios.',
  },
];

const MOCK_NAVEGACION: readonly NavItem[] = [
  {
    id: 1,
    etiqueta: 'Inicio',
    ruta: '/inicio',
    exacto: true,
    descripcion: 'Portada',
    grupo: 'principal',
  },
  {
    id: 2,
    etiqueta: 'Catálogo',
    ruta: '/catalogo',
    exacto: false,
    descripcion: 'Parque',
    grupo: 'principal',
  },
  {
    id: 6,
    etiqueta: 'Programa y Tramos',
    ruta: '/itinerario/programa',
    exacto: false,
    descripcion: 'Tramos',
    grupo: 'itinerario',
  },
  {
    id: 7,
    etiqueta: 'Directo y Clasificación',
    ruta: '/itinerario/recorrido',
    exacto: false,
    descripcion: 'Directo',
    grupo: 'itinerario',
  },
];

const MOCK_ITINERARIO: ItinerarioMockData = {
  tramos: [
    {
      codigo: 'TC-01',
      nombre: 'Cruz Verde',
      estado: 'PROGRAMADO',
      distancia: '14.20 km',
      media: '45.0 km/h',
      controles: '03',
    },
    {
      codigo: 'TC-02',
      nombre: 'Navacerrada',
      estado: 'MEDIA IMPUESTA',
      distancia: '18.40 km',
      media: '42.0 km/h',
      controles: '04',
    },
    {
      codigo: 'TC-03',
      nombre: 'Lozoya',
      estado: 'CONTROL SECRETO',
      distancia: '22.80 km',
      media: '48.5 km/h',
      controles: '05',
    },
  ],
  clasificacion: [
    {
      posicion: '1',
      dorsal: '14',
      equipo: 'M. Valdés / C. Serrano',
      vehiculo: 'Porsche 911 Carrera RS',
      desviacion: '0.2 s',
      esLider: true,
      penalizado: false,
    },
  ],
  cronograma: [
    {
      hora: '07:45',
      titulo: 'Apertura de parque cerrado y verificaciones',
      lugar: 'Lonja del Monasterio',
      estado: 'OBLIGATORIO',
      tono: 'cuero',
    },
    {
      hora: '16:30',
      titulo: 'Entrega de trofeos',
      lugar: 'Lonja del Monasterio · Meta',
      estado: 'OFICIAL',
      tono: 'verde',
    },
  ],
};

describe('App Routes', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes, withComponentInputBinding()),
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  const responderMocksPendientes = (): void => {
    httpMock.match('/data/vehiculos.json').forEach((req) => req.flush(MOCK_VEHICULOS));
    httpMock.match('/data/navegacion.json').forEach((req) => req.flush(MOCK_NAVEGACION));
    httpMock.match('/data/itinerario.json').forEach((req) => req.flush(MOCK_ITINERARIO));
  };

  it('debe redirigir la ruta raíz vacía hacia /inicio y mostrar el banner principal y los bloques de portada', async () => {
    const harness = await RouterTestingHarness.create('/');
    responderMocksPendientes();
    harness.detectChanges();
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/inicio');
    expect(harness.routeNativeElement?.textContent).toContain(
      'I Rally & Concentración Histórica Classic Motor',
    );
    expect(harness.routeNativeElement?.querySelector('app-cuadro-instrumentos')).toBeNull();
    expect(
      harness.routeNativeElement?.querySelector('img.inicio__banner-imagen')?.getAttribute('alt'),
    ).toBeTruthy();
    expect(harness.routeNativeElement?.querySelectorAll('.inicio__vehiculo').length).toBe(3);
    expect(
      harness.routeNativeElement?.querySelector('img.inicio__mapa')?.getAttribute('alt'),
    ).toBeTruthy();
  });

  it('debe cargar las páginas principales con la biblioteca Ed. I', async () => {
    const harness = await RouterTestingHarness.create();
    const router = TestBed.inject(Router);

    await harness.navigateByUrl('/catalogo');
    responderMocksPendientes();
    harness.detectChanges();
    expect(router.url).toBe('/catalogo');
    expect(harness.routeNativeElement?.textContent).toContain('Catálogo de Vehículos Admitidos');
    expect(harness.routeNativeElement?.querySelectorAll('.dorsal-circular').length).toBe(3);

    await harness.navigateByUrl('/catalogo?categoria=GRAN%20TURISMO');
    responderMocksPendientes();
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelectorAll('.catalogo__tarjeta').length).toBe(1);
    expect(harness.routeNativeElement?.textContent).toContain('MOSTRANDO 1 DE 3 DORSALES');

    await harness.navigateByUrl('/inscripcion');
    responderMocksPendientes();
    harness.detectChanges();
    expect(router.url).toBe('/inscripcion');
    expect(harness.routeNativeElement?.textContent).toContain('Inscripción de Equipo y Vehículo');
    expect(
      harness.routeNativeElement?.querySelectorAll('.campo-carnet__entrada').length,
    ).toBeGreaterThanOrEqual(8);
    expect(harness.routeNativeElement?.querySelector('form button[type="submit"]')).toBeTruthy();

    await harness.navigateByUrl('/guia-estilo');
    responderMocksPendientes();
    harness.detectChanges();
    expect(router.url).toBe('/guia-estilo');
    expect(harness.routeNativeElement?.textContent).toContain(
      'Guía de estilos · Regularidad Clásica',
    );
  });

  it('debe vincular el parámetro :id mediante Signal input en /catalogo/:id y gestionar dorsal inválido', async () => {
    const harness = await RouterTestingHarness.create('/catalogo/1');
    responderMocksPendientes();
    harness.detectChanges();
    const router = TestBed.inject(Router);
    expect(harness.routeNativeElement?.textContent).toContain('DORSAL 14');
    expect(harness.routeNativeElement?.textContent).toContain('Porsche 911 Carrera RS 2.7');
    expect(harness.routeNativeElement?.textContent).toContain('210 CV · 2.687 cc');
    expect(harness.routeNativeElement?.textContent).toContain('Chasis serie Touring');
    expect(
      harness.routeNativeElement?.querySelector('img.detalle__imagen')?.getAttribute('alt'),
    ).toBeTruthy();
    expect(harness.routeNativeElement?.querySelector('.dorsal-circular')?.textContent?.trim()).toBe(
      '14',
    );

    const pulsarSiguiente = async (): Promise<void> => {
      const btnSiguiente = Array.from(
        harness.routeNativeElement?.querySelectorAll('button') ?? [],
      ).find((b) => b.textContent?.includes('Siguiente Dorsal'));
      expect(btnSiguiente).toBeTruthy();
      btnSiguiente?.click();
      await harness.fixture.whenStable();
      harness.detectChanges();
    };

    await pulsarSiguiente();
    expect(router.url).toBe('/catalogo/2');
    expect(harness.routeNativeElement?.textContent).toContain('DORSAL 27');

    await pulsarSiguiente();
    expect(router.url).toBe('/catalogo/3');
    expect(harness.routeNativeElement?.textContent).toContain('DORSAL 42');

    await pulsarSiguiente();
    expect(router.url).toBe('/catalogo/1');
    expect(harness.routeNativeElement?.textContent).toContain('DORSAL 14');

    await harness.navigateByUrl('/catalogo/abc');
    responderMocksPendientes();
    harness.detectChanges();
    expect(harness.routeNativeElement?.textContent).toContain(
      'Identificador fuera de lista oficial',
    );
    expect(harness.routeNativeElement?.querySelector('.panel-directo')).toBeTruthy();
  });

  it('debe redirigir /itinerario a /itinerario/programa y permitir cambiar a /itinerario/recorrido', async () => {
    const harness = await RouterTestingHarness.create('/itinerario');
    responderMocksPendientes();
    harness.detectChanges();
    const router = TestBed.inject(Router);

    expect(router.url).toBe('/itinerario/programa');
    expect(harness.routeNativeElement?.querySelectorAll('.tarjeta-tramo').length).toBe(3);
    expect(harness.routeNativeElement?.querySelectorAll('.programa__hito').length).toBe(2);
    expect(harness.routeNativeElement?.textContent).toContain('Cronograma de Actividades');

    await harness.navigateByUrl('/itinerario/recorrido');
    responderMocksPendientes();
    harness.detectChanges();
    expect(router.url).toBe('/itinerario/recorrido');
    expect(harness.routeNativeElement?.querySelector('.panel-directo')).toBeTruthy();
    expect(
      harness.routeNativeElement?.querySelector('img.recorrido__mapa')?.getAttribute('alt'),
    ).toBeTruthy();
    expect(harness.routeNativeElement?.textContent).toContain('55.40 km cronometrados');
    expect(harness.routeNativeElement?.querySelector('table.tabla-clasificacion')).toBeTruthy();
    expect(harness.routeNativeElement?.querySelector('.tabla-clasificacion__lider')).toBeTruthy();
  });

  it('debe resolver rutas desconocidas con NoEncontrado burdeos 404 y permitir regresar a /inicio', async () => {
    const harness = await RouterTestingHarness.create('/ruta-que-no-existe');
    responderMocksPendientes();
    harness.detectChanges();
    const router = TestBed.inject(Router);

    expect(harness.routeNativeElement?.textContent).toContain('Página no encontrada');
    expect(
      harness.routeNativeElement?.querySelector('.dorsal-circular--burdeos')?.textContent,
    ).toContain('404');

    await harness.navigateByUrl('/itinerario/subruta-invalida');
    responderMocksPendientes();
    harness.detectChanges();
    expect(harness.routeNativeElement?.textContent).toContain('Página no encontrada');

    const botonInicio = harness.routeNativeElement?.querySelector(
      'a[href="/inicio"]',
    ) as HTMLAnchorElement;
    expect(botonInicio).toBeTruthy();

    await harness.navigateByUrl('/inicio');
    responderMocksPendientes();
    harness.detectChanges();
    expect(router.url).toBe('/inicio');
  });
});
