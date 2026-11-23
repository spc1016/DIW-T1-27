import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { ItinerarioMockData, NavItem } from './navegacion-service';

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
];

const MOCK_ITINERARIO: ItinerarioMockData = {
  tramos: [],
  clasificacion: [],
};

describe('App', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes, withComponentInputBinding()),
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  const responderMocksPendientes = (): void => {
    httpMock.match('/data/navegacion.json').forEach((req) => req.flush(MOCK_NAVEGACION));
    httpMock.match('/data/itinerario.json').forEach((req) => req.flush(MOCK_ITINERARIO));
    httpMock.match('/data/vehiculos.json').forEach((req) => req.flush([]));
  };

  it('debe crear el shell principal de la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    responderMocksPendientes();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe renderizar la cabecera Verde carreras con filete cromado, iconos técnicos y pie en tono Ed. I', async () => {
    const fixture = TestBed.createComponent(App);
    responderMocksPendientes();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/inicio');
    responderMocksPendientes();
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a.cabecera__salto')?.getAttribute('href')).toBe(
      '#contenido-principal',
    );
    expect(compiled.querySelector('header.cabecera .cabecera__bisel')).toBeTruthy();
    expect(compiled.querySelector('header.cabecera .filete-cromo')).toBeTruthy();
    expect(compiled.querySelector('footer.pie .filete-cromo')).toBeTruthy();
    expect(compiled.querySelector('footer.pie')?.textContent).toContain(
      'El tiempo exacto, con la elegancia de antes.',
    );

    const svgs = compiled.querySelectorAll('header svg.icono-tecnico');
    expect(svgs.length).toBeGreaterThan(0);
    svgs.forEach((svg) => expect(svg.getAttribute('aria-hidden')).toBe('true'));

    const navLinks = compiled.querySelectorAll('.cabecera__enlace');
    expect(navLinks.length).toBe(5);
    expect(Array.from(navLinks).map((el) => el.textContent?.trim())).toEqual([
      'Inicio',
      'Catálogo',
      'Itinerario',
      'Inscripción',
      'Guía de Estilo',
    ]);
  });

  it('debe alternar el menú móvil con aria-expanded y cerrarlo al seleccionar un enlace', async () => {
    const fixture = TestBed.createComponent(App);
    responderMocksPendientes();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/inicio');
    responderMocksPendientes();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toggleBtn = compiled.querySelector('.cabecera__boton-menu') as HTMLButtonElement;
    const nav = compiled.querySelector('#menu-principal') as HTMLElement;

    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    expect(nav.classList.contains('cabecera__nav--abierta')).toBe(false);

    toggleBtn.click();
    fixture.detectChanges();

    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');
    expect(nav.classList.contains('cabecera__nav--abierta')).toBe(true);

    const firstLink = compiled.querySelector('.cabecera__enlace') as HTMLAnchorElement;
    firstLink.click();
    fixture.detectChanges();

    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    expect(nav.classList.contains('cabecera__nav--abierta')).toBe(false);
  });

  it('debe cerrar el menú móvil al pulsar Escape y tras una navegación programática', async () => {
    const fixture = TestBed.createComponent(App);
    responderMocksPendientes();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/inicio');
    responderMocksPendientes();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toggleBtn = compiled.querySelector('.cabecera__boton-menu') as HTMLButtonElement;

    toggleBtn.click();
    fixture.detectChanges();
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');

    toggleBtn.click();
    fixture.detectChanges();
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');

    await router.navigateByUrl('/catalogo');
    responderMocksPendientes();
    fixture.detectChanges();
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
  });
});
