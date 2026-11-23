import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { VehiculoMuestra } from '../../vehiculo-service';
import { Detalle } from './detalle';

const MOCK_VEHICULOS: readonly VehiculoMuestra[] = [
  {
    id: 1,
    dorsal: '14',
    modelo: 'Porsche 911 Carrera RS 2.7',
    anio: 1973,
    categoria: 'GRAN TURISMO',
    tono: 'verde',
    potencia: '210 CV · 2.687 cc',
    historial: 'Chasis serie Touring homologado FIA Grupo 4 con historial alpino.',
    imagen: '/img/vehiculos/porsche-911-rs.svg',
    imagenAlt: 'Ilustración técnica del Porsche 911 Carrera RS 2.7 dorsal 14',
    resumen: 'Unidad homologada con doble cronometraje mecánico.',
  },
];

describe('Detalle', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detalle],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([], withComponentInputBinding()),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe renderizar la ficha técnica completa con año, categoría, potencia, historial e imagen con alt', () => {
    const fixture = TestBed.createComponent(Detalle);
    fixture.componentRef.setInput('id', '1');
    fixture.detectChanges();
    httpMock.expectOne('/data/vehiculos.json').flush(MOCK_VEHICULOS);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const img = el.querySelector('img.detalle__imagen') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('/img/vehiculos/porsche-911-rs.svg');
    expect(img.getAttribute('alt')).toContain('Porsche 911 Carrera RS 2.7');

    expect(el.textContent).toContain('1973');
    expect(el.textContent).toContain('GRAN TURISMO');
    expect(el.textContent).toContain('210 CV · 2.687 cc');
    expect(el.textContent).toContain('Chasis serie Touring homologado FIA Grupo 4');
  });
});
