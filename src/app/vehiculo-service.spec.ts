import { TestBed } from '@angular/core/testing';
import { VehiculoService } from './vehiculo-service';

describe('VehiculoService', () => {
  let service: VehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoService);
  });

  it('debe devolver todos los vehículos clásicos de muestra sin filtro', () => {
    expect(service.obtenerTodas().length).toBe(3);
  });

  it('debe filtrar por categoría o tono semántico', () => {
    expect(service.obtenerTodas('burdeos').length).toBe(1);
    expect(service.obtenerTodas('porsche')[0]?.dorsal).toBe('14');
  });

  it('debe obtener un vehículo por id y calcular idSiguiente circularmente', () => {
    expect(service.obtenerPorId(1)?.dorsal).toBe('14');
    expect(service.obtenerPorId(99)).toBeUndefined();
    expect(service.idSiguiente(1)).toBe(2);
    expect(service.idSiguiente(3)).toBe(1);
    expect(service.idSiguiente(99)).toBe(1);
  });
});
