import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ItinerarioMockData, NavegacionService, NavItem } from './navegacion-service';

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
    id: 3,
    etiqueta: 'Itinerario',
    ruta: '/itinerario',
    exacto: false,
    descripcion: 'Tramos',
    grupo: 'principal',
  },
  {
    id: 4,
    etiqueta: 'Inscripción',
    ruta: '/inscripcion',
    exacto: false,
    descripcion: 'Carnet',
    grupo: 'principal',
  },
  {
    id: 5,
    etiqueta: 'Guía de Estilo',
    ruta: '/guia-estilo',
    exacto: false,
    descripcion: 'Manual',
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
      codigo: 'TC-01 · SALIDA 09:00',
      nombre: 'Puerto de la Cruz Verde',
      estado: 'PROGRAMADO',
      distancia: '14.20 km',
      media: '45.0 km/h',
      controles: '03',
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
      titulo: 'Apertura de parque cerrado',
      lugar: 'San Lorenzo',
      estado: 'OBLIGATORIO',
      tono: 'cuero',
    },
  ],
};

describe('NavegacionService', () => {
  let service: NavegacionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(NavegacionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe cargar navegación e itinerario desde los archivos mock JSON', () => {
    httpMock.expectOne('/data/navegacion.json').flush(MOCK_NAVEGACION);
    httpMock.expectOne('/data/itinerario.json').flush(MOCK_ITINERARIO);

    expect(service.estadoNavegacion()).toBe('listo');
    expect(service.estadoItinerario()).toBe('listo');
    expect(service.obtenerTodas().length).toBe(7);
    expect(service.tramos().length).toBe(1);
    expect(service.clasificacion().length).toBe(1);
    expect(service.cronograma().length).toBe(1);
  });

  it('debe filtrar los ítems por grupo principal e itinerario', () => {
    httpMock.expectOne('/data/navegacion.json').flush(MOCK_NAVEGACION);
    httpMock.expectOne('/data/itinerario.json').flush(MOCK_ITINERARIO);

    const principales = service.obtenerTodas('principal');
    const itinerario = service.obtenerTodas('itinerario');

    expect(principales.map((item) => item.ruta)).toEqual([
      '/inicio',
      '/catalogo',
      '/itinerario',
      '/inscripcion',
      '/guia-estilo',
    ]);
    expect(itinerario.map((item) => item.ruta)).toEqual([
      '/itinerario/programa',
      '/itinerario/recorrido',
    ]);
  });

  it('debe encontrar un ítem por id, devolver undefined si no existe y calcular idSiguiente circularmente', () => {
    httpMock.expectOne('/data/navegacion.json').flush(MOCK_NAVEGACION);
    httpMock.expectOne('/data/itinerario.json').flush(MOCK_ITINERARIO);

    expect(service.obtenerPorId(1)?.etiqueta).toBe('Inicio');
    expect(service.obtenerPorId(999)).toBeUndefined();
    expect(service.idSiguiente(1)).toBe(2);
    expect(service.idSiguiente(7)).toBe(1);
    expect(service.idSiguiente(999)).toBe(1);
  });

  it('debe marcar error controlado si falla la lectura de los archivos JSON', () => {
    httpMock
      .expectOne('/data/navegacion.json')
      .flush('Error', { status: 500, statusText: 'Server Error' });
    httpMock
      .expectOne('/data/itinerario.json')
      .flush('Error', { status: 500, statusText: 'Server Error' });

    expect(service.estadoNavegacion()).toBe('error');
    expect(service.estadoItinerario()).toBe('error');
    expect(service.obtenerTodas()).toEqual([]);
    expect(service.idSiguiente(1)).toBe(0);
  });
});
