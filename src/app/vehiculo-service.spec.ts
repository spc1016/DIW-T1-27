import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { VehiculoMuestra, VehiculoService } from './vehiculo-service';

const MOCK_VEHICULOS: readonly VehiculoMuestra[] = [
  {
    id: 1,
    dorsal: '14',
    modelo: 'Porsche 911 Carrera RS 2.7',
    anio: 1973,
    categoria: 'GRAN TURISMO',
    tono: 'verde',
    resumen: 'Unidad homologada con doble cronometraje mecánico.',
  },
  {
    id: 2,
    dorsal: '27',
    modelo: 'Lancia Fulvia Coupé 1.6 HF',
    anio: 1972,
    categoria: 'TURISMO HISTÓRICO',
    tono: 'burdeos',
    resumen: 'Preparación de regularidad clásica para tramos de montaña.',
  },
  {
    id: 3,
    dorsal: '42',
    modelo: 'Alfa Romeo Giulia Sprint GTA',
    anio: 1967,
    categoria: 'SPORT CLÁSICO',
    tono: 'verde',
    resumen: 'Carrocería ligera verificada en parque cerrado.',
  },
];

describe('VehiculoService', () => {
  let service: VehiculoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(VehiculoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe cargar los vehículos desde /data/vehiculos.json y devolver todos sin filtro', () => {
    expect(service.estadoCarga()).toBe('cargando');

    const req = httpMock.expectOne('/data/vehiculos.json');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_VEHICULOS);

    expect(service.estadoCarga()).toBe('listo');
    expect(service.obtenerTodas().length).toBe(3);
  });

  it('debe filtrar por categoría, tono, modelo o dorsal', () => {
    httpMock.expectOne('/data/vehiculos.json').flush(MOCK_VEHICULOS);

    expect(service.obtenerTodas('burdeos').length).toBe(1);
    expect(service.obtenerTodas('porsche')[0]?.dorsal).toBe('14');
    expect(service.obtenerTodas('42')[0]?.id).toBe(3);
  });

  it('debe obtener un vehículo por id y calcular idSiguiente circularmente', () => {
    httpMock.expectOne('/data/vehiculos.json').flush(MOCK_VEHICULOS);

    expect(service.obtenerPorId(1)?.dorsal).toBe('14');
    expect(service.obtenerPorId(99)).toBeUndefined();
    expect(service.idSiguiente(1)).toBe(2);
    expect(service.idSiguiente(3)).toBe(1);
    expect(service.idSiguiente(99)).toBe(1);
  });

  it('debe gestionar una colección vacía o error HTTP de forma controlada', () => {
    httpMock
      .expectOne('/data/vehiculos.json')
      .flush('Error', { status: 404, statusText: 'Not Found' });

    expect(service.estadoCarga()).toBe('error');
    expect(service.obtenerTodas()).toEqual([]);
    expect(service.idSiguiente(1)).toBe(0);
  });
});
