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

  it('debe redirigir la ruta raíz vacía hacia /inicio y mostrar el cuadro de instrumentos firma', async () => {
    const harness = await RouterTestingHarness.create('/');
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/inicio');
    expect(harness.routeNativeElement?.textContent).toContain(
      'I Rally & Concentración Histórica Classic Motor',
    );
    expect(harness.routeNativeElement?.querySelector('app-cuadro-instrumentos')).toBeTruthy();
  });

  it('debe cargar las páginas principales con la biblioteca Ed. I', async () => {
    const harness = await RouterTestingHarness.create();
    const router = TestBed.inject(Router);

    await harness.navigateByUrl('/catalogo');
    expect(router.url).toBe('/catalogo');
    expect(harness.routeNativeElement?.textContent).toContain('Catálogo de Vehículos Admitidos');
    expect(harness.routeNativeElement?.querySelectorAll('.dorsal-circular').length).toBe(3);

    await harness.navigateByUrl('/inscripcion');
    expect(router.url).toBe('/inscripcion');
    expect(harness.routeNativeElement?.textContent).toContain('Inscripción de Equipo y Vehículo');
    expect(harness.routeNativeElement?.querySelectorAll('.campo-carnet__entrada').length).toBe(3);

    await harness.navigateByUrl('/guia-estilo');
    expect(router.url).toBe('/guia-estilo');
    expect(harness.routeNativeElement?.textContent).toContain(
      'Guía de estilos · Regularidad Clásica',
    );
  });

  it('debe vincular el parámetro :id mediante Signal input en /catalogo/:id y gestionar dorsal inválido', async () => {
    const harness = await RouterTestingHarness.create('/catalogo/1');
    expect(harness.routeNativeElement?.textContent).toContain('DORSAL 14');
    expect(harness.routeNativeElement?.textContent).toContain('Porsche 911 Carrera RS 2.7');
    expect(harness.routeNativeElement?.querySelector('.dorsal-circular')?.textContent?.trim()).toBe(
      '14',
    );

    await harness.navigateByUrl('/catalogo/abc');
    expect(harness.routeNativeElement?.textContent).toContain(
      'Identificador fuera de lista oficial',
    );
    expect(harness.routeNativeElement?.querySelector('.panel-directo')).toBeTruthy();
  });

  it('debe redirigir /itinerario a /itinerario/programa y permitir cambiar a /itinerario/recorrido', async () => {
    const harness = await RouterTestingHarness.create('/itinerario');
    const router = TestBed.inject(Router);

    expect(router.url).toBe('/itinerario/programa');
    expect(harness.routeNativeElement?.querySelectorAll('.tarjeta-tramo').length).toBe(3);

    await harness.navigateByUrl('/itinerario/recorrido');
    expect(router.url).toBe('/itinerario/recorrido');
    expect(harness.routeNativeElement?.querySelector('.panel-directo')).toBeTruthy();
    expect(harness.routeNativeElement?.querySelector('table.tabla-clasificacion')).toBeTruthy();
    expect(harness.routeNativeElement?.querySelector('.tabla-clasificacion__lider')).toBeTruthy();
  });

  it('debe resolver rutas desconocidas con NoEncontrado burdeos 404 y permitir regresar a /inicio', async () => {
    const harness = await RouterTestingHarness.create('/ruta-que-no-existe');
    const router = TestBed.inject(Router);

    expect(harness.routeNativeElement?.textContent).toContain('Página no encontrada');
    expect(
      harness.routeNativeElement?.querySelector('.dorsal-circular--burdeos')?.textContent,
    ).toContain('404');

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
