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

  it('debe redirigir la ruta raíz vacía hacia /inicio', async () => {
    const harness = await RouterTestingHarness.create('/');
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/inicio');
    expect(harness.routeNativeElement?.textContent).toContain(
      'I Rally & Concentración Histórica Classic Motor',
    );
  });

  it('debe cargar las cinco páginas principales del esqueleto', async () => {
    const harness = await RouterTestingHarness.create();
    const router = TestBed.inject(Router);

    await harness.navigateByUrl('/catalogo');
    expect(router.url).toBe('/catalogo');
    expect(harness.routeNativeElement?.textContent).toContain('Catálogo de Vehículos Clásicos');

    await harness.navigateByUrl('/inscripcion');
    expect(router.url).toBe('/inscripcion');
    expect(harness.routeNativeElement?.textContent).toContain('Inscripción de Participantes');

    await harness.navigateByUrl('/guia-estilo');
    expect(router.url).toBe('/guia-estilo');
    expect(harness.routeNativeElement?.textContent).toContain('Guía de Estilo del Club');
  });

  it('debe vincular el parámetro :id mediante Signal input en /catalogo/:id', async () => {
    const harness = await RouterTestingHarness.create('/catalogo/1');
    expect(harness.routeNativeElement?.textContent).toContain('Dorsal #1');

    await harness.navigateByUrl('/catalogo/abc');
    expect(harness.routeNativeElement?.textContent).toContain('Identificador no numérico recibido');
  });

  it('debe redirigir /itinerario a /itinerario/programa y permitir cambiar a /itinerario/recorrido', async () => {
    const harness = await RouterTestingHarness.create('/itinerario');
    const router = TestBed.inject(Router);

    expect(router.url).toBe('/itinerario/programa');
    expect(harness.routeNativeElement?.textContent).toContain('Programa Oficial por Jornadas');

    await harness.navigateByUrl('/itinerario/recorrido');
    expect(router.url).toBe('/itinerario/recorrido');
    expect(harness.routeNativeElement?.textContent).toContain('Recorrido y Tramos Cronometrados');
  });

  it('debe resolver rutas desconocidas con NoEncontrado y permitir regresar a /inicio', async () => {
    const harness = await RouterTestingHarness.create('/ruta-que-no-existe');
    const router = TestBed.inject(Router);

    expect(harness.routeNativeElement?.textContent).toContain('Página no encontrada');

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
