import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VehiculoMuestra } from '../../vehiculo-service';
import { Catalogo } from './catalogo';

const MOCK_VEHICULOS: readonly VehiculoMuestra[] = [
  {
    id: 1,
    dorsal: '14',
    modelo: 'Porsche 911 Carrera RS 2.7',
    anio: 1973,
    categoria: 'GRAN TURISMO',
    tono: 'verde',
    resumen: 'Unidad homologada.',
  },
  {
    id: 2,
    dorsal: '27',
    modelo: 'Lancia Fulvia Coupé 1.6 HF',
    anio: 1972,
    categoria: 'TURISMO HISTÓRICO',
    tono: 'burdeos',
    resumen: 'Preparación de montaña.',
  },
  {
    id: 3,
    dorsal: '42',
    modelo: 'Alfa Romeo Giulia Sprint GTA',
    anio: 1967,
    categoria: 'SPORT CLÁSICO',
    tono: 'verde',
    resumen: 'Carrocería ligera.',
  },
  {
    id: 4,
    dorsal: '08',
    modelo: 'MG TC Midget',
    anio: 1948,
    categoria: 'PRE-1960 CLÁSICO',
    tono: 'verde',
    resumen: 'Roadster británico de posguerra.',
  },
];

describe('Catalogo', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catalogo],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe filtrar en tiempo real por modelo o dorsal y actualizar el contador tabular', () => {
    const fixture = TestBed.createComponent(Catalogo);
    fixture.detectChanges();
    httpMock.expectOne('/data/vehiculos.json').flush(MOCK_VEHICULOS);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.catalogo__contador')?.textContent).toContain(
      'MOSTRANDO 4 DE 4 DORSALES',
    );

    const input = el.querySelector('#catalogo-busqueda') as HTMLInputElement;
    input.value = 'Porsche';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(el.querySelectorAll('.catalogo__tarjeta').length).toBe(1);
    expect(el.querySelector('.catalogo__contador')?.textContent).toContain(
      'MOSTRANDO 1 DE 4 DORSALES',
    );

    input.value = '014';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(el.querySelectorAll('.catalogo__tarjeta').length).toBe(1);
    expect(el.textContent).toContain('Porsche 911 Carrera RS 2.7');
  });

  it('debe combinar filtros de categoría y época y gestionar estado vacío con reinicio', () => {
    const fixture = TestBed.createComponent(Catalogo);
    fixture.detectChanges();
    httpMock.expectOne('/data/vehiculos.json').flush(MOCK_VEHICULOS);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const selectCategoria = el.querySelector('#catalogo-categoria') as HTMLSelectElement;
    const selectEpoca = el.querySelector('#catalogo-epoca') as HTMLSelectElement;

    selectEpoca.value = 'pre-1960';
    selectEpoca.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(el.querySelectorAll('.catalogo__tarjeta').length).toBe(1);
    expect(el.textContent).toContain('MG TC Midget');

    selectCategoria.value = 'GRAN TURISMO';
    selectCategoria.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(el.querySelectorAll('.catalogo__tarjeta').length).toBe(0);
    expect(el.querySelector('.catalogo__vacio')).toBeTruthy();

    const btnLimpiar = el.querySelector('.catalogo__vacio button') as HTMLButtonElement;
    btnLimpiar.click();
    fixture.detectChanges();

    expect(el.querySelectorAll('.catalogo__tarjeta').length).toBe(4);
    expect(el.querySelector('.catalogo__vacio')).toBeNull();
  });
});
