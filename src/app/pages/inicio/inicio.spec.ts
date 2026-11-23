import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavItem } from '../../navegacion-service';
import { VehiculoMuestra } from '../../vehiculo-service';
import { Inicio } from './inicio';

const MOCK_VEHICULOS: readonly VehiculoMuestra[] = [
  {
    id: 1,
    dorsal: '14',
    modelo: 'Porsche 911 Carrera RS 2.7',
    anio: 1973,
    categoria: 'GRAN TURISMO',
    tono: 'verde',
    resumen: 'Unidad homologada con doble cronometraje.',
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
    resumen: 'Carrocería ligera de época.',
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

const MOCK_NAV: readonly NavItem[] = [
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
];

describe('Inicio', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inicio],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe mostrar 3 vehículos destacados con imagen alt descriptiva y enlace a su ficha', () => {
    const fixture = TestBed.createComponent(Inicio);
    fixture.detectChanges();
    httpMock.expectOne('/data/navegacion.json').flush(MOCK_NAV);
    httpMock.expectOne('/data/itinerario.json').flush({ tramos: [], clasificacion: [] });
    httpMock.expectOne('/data/vehiculos.json').flush(MOCK_VEHICULOS);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const tarjetas = el.querySelectorAll('.inicio__vehiculo');
    expect(tarjetas.length).toBe(3);

    const imagenesVehiculos = el.querySelectorAll('.inicio__vehiculo-imagen');
    expect(imagenesVehiculos.length).toBe(3);
    imagenesVehiculos.forEach((img) => {
      expect(img.getAttribute('alt')?.trim().length).toBeGreaterThan(10);
    });

    const enlacePrimero = tarjetas[0].querySelector('a') as HTMLAnchorElement;
    expect(enlacePrimero.getAttribute('href')).toBe('/catalogo/1');
  });

  it('debe incluir la sección de localización y punto de encuentro con mapa accesible y coordenadas', () => {
    const fixture = TestBed.createComponent(Inicio);
    fixture.detectChanges();
    httpMock.expectOne('/data/navegacion.json').flush(MOCK_NAV);
    httpMock.expectOne('/data/itinerario.json').flush({ tramos: [], clasificacion: [] });
    httpMock.expectOne('/data/vehiculos.json').flush(MOCK_VEHICULOS);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const mapa = el.querySelector('img.inicio__mapa') as HTMLImageElement;
    expect(mapa).toBeTruthy();
    expect(mapa.getAttribute('src')).toBe('/img/mapa-encuentro.svg');
    expect(mapa.getAttribute('alt')?.trim().length).toBeGreaterThan(20);
    expect(el.textContent).toContain('San Lorenzo de El Escorial');
    expect(el.textContent).toContain('40° 35\' 20" N');
  });
});
