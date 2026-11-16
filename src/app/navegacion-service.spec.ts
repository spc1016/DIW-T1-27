import { TestBed } from '@angular/core/testing';
import { NavegacionService } from './navegacion-service';

describe('NavegacionService', () => {
  let service: NavegacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavegacionService);
  });

  it('debe devolver todos los ítems de navegación sin filtro', () => {
    const items = service.obtenerTodas();
    expect(items.length).toBe(7);
  });

  it('debe filtrar los ítems por grupo principal e itinerario', () => {
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

  it('debe encontrar un ítem por id y devolver undefined si no existe', () => {
    expect(service.obtenerPorId(1)?.etiqueta).toBe('Inicio');
    expect(service.obtenerPorId(999)).toBeUndefined();
  });

  it('debe calcular circularmente el id siguiente', () => {
    expect(service.idSiguiente(1)).toBe(2);
    expect(service.idSiguiente(7)).toBe(1);
    expect(service.idSiguiente(999)).toBe(1);
  });
});
