import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('App Routes', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding())],
    }).compileComponents();
  });

  it('debe redirigir la ruta raíz vacía hacia /inicio y mostrar la cabina GT', async () => {
    const harness = await RouterTestingHarness.create('/');
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/inicio');
    expect(harness.routeNativeElement?.textContent).toContain(
      'I Rally & Concentración Histórica Classic Motor',
    );
    expect(harness.routeNativeElement?.querySelector('.instrument-dial')).toBeTruthy();
  });

  it('debe cargar las páginas principales con estética Concours Edition', async () => {
    const harness = await RouterTestingHarness.create();
    const router = TestBed.inject(Router);

    await harness.navigateByUrl('/catalogo');
    expect(router.url).toBe('/catalogo');
    expect(harness.routeNativeElement?.textContent).toContain('Catálogo de Vehículos Clásicos');
    expect(harness.routeNativeElement?.querySelectorAll('.placa-dorsal').length).toBe(3);

    await harness.navigateByUrl('/inscripcion');
    expect(router.url).toBe('/inscripcion');
    expect(harness.routeNativeElement?.textContent).toContain('Inscripción de Participantes');
    expect(harness.routeNativeElement?.querySelector('.leather-panel')).toBeTruthy();

    await harness.navigateByUrl('/guia-estilo');
    expect(router.url).toBe('/guia-estilo');
    expect(harness.routeNativeElement?.textContent).toContain('Guía de Estilo del Club');
  });

  it('debe vincular el parámetro :id mediante Signal input con VehiculoService en /catalogo/:id', async () => {
    const harness = await RouterTestingHarness.create('/catalogo/1');
    expect(harness.routeNativeElement?.textContent).toContain('DORSAL #014');
    expect(harness.routeNativeElement?.textContent).toContain('Porsche 911 Carrera RS 2.7');

    await harness.navigateByUrl('/catalogo/abc');
    expect(harness.routeNativeElement?.textContent).toContain(
      'Identificador no numérico o sin ficha asignada',
    );
    expect(harness.routeNativeElement?.querySelector('.enamel-bordeaux')).toBeTruthy();
  });

  it('debe redirigir /itinerario a /itinerario/programa y permitir cambiar a /itinerario/recorrido con rutómetro', async () => {
    const harness = await RouterTestingHarness.create('/itinerario');
    const router = TestBed.inject(Router);

    expect(router.url).toBe('/itinerario/programa');
    expect(harness.routeNativeElement?.textContent).toContain(
      'Programa Oficial y Controles Horarios',
    );
    expect(harness.routeNativeElement?.querySelector('table.rutometro')).toBeTruthy();

    await harness.navigateByUrl('/itinerario/recorrido');
    expect(router.url).toBe('/itinerario/recorrido');
    expect(harness.routeNativeElement?.textContent).toContain('Recorrido y Tramos Cronometrados');
    expect(harness.routeNativeElement?.querySelector('.vernier')).toBeTruthy();
  });

  it('debe resolver rutas desconocidas con NoEncontrado burdeos 404 y permitir regresar a /inicio', async () => {
    const harness = await RouterTestingHarness.create('/ruta-que-no-existe');
    const router = TestBed.inject(Router);

    expect(harness.routeNativeElement?.textContent).toContain('Página no encontrada');
    expect(harness.routeNativeElement?.querySelector('.enamel-bordeaux')?.textContent).toContain(
      '404',
    );

    await harness.navigateByUrl('/itinerario/subruta-invalida');
    expect(harness.routeNativeElement?.textContent).toContain('Página no encontrada');

    const botonInicio = harness.routeNativeElement?.querySelector(
      'a[href="/inicio"]',
    ) as HTMLAnchorElement;
    expect(botonInicio).toBeTruthy();

    await harness.navigateByUrl('/inicio');
    expect(router.url).toBe('/inicio');
  });
});
