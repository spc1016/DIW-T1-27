import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GuiaEstilo } from './guia-estilo';

describe('GuiaEstilo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaEstilo],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('debe renderizar los cinco colores oficiales, acabado cromado y biblioteca Ed. I completa', () => {
    const fixture = TestBed.createComponent(GuiaEstilo);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Verde carreras');
    expect(el.textContent).toContain('Cuero coñac');
    expect(el.textContent).toContain('Burdeos');
    expect(el.textContent).toContain('Marfil');
    expect(el.textContent).toContain('Tinta');
    expect(el.querySelector('app-cuadro-instrumentos')).toBeTruthy();
    expect(el.querySelector('.boton--primario')).toBeTruthy();
    expect(el.querySelector('.boton--secundario')).toBeTruthy();
    expect(el.querySelector('.boton--terciario')).toBeTruthy();
    expect(el.querySelector('.boton--alerta')).toBeTruthy();
    expect(el.querySelector('.campo-carnet__entrada')).toBeTruthy();
    expect(el.querySelectorAll('.dorsal-circular').length).toBe(2);
    expect(el.querySelector('.tarjeta-tramo')).toBeTruthy();
    expect(el.querySelector('.tabla-clasificacion__lider')).toBeTruthy();
  });

  it('debe permitir simular lecturas del cuadro de instrumentos dentro de la guía', () => {
    const fixture = TestBed.createComponent(GuiaEstilo);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const btnFuera = Array.from(el.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Penalización'),
    );
    btnFuera?.click();
    fixture.detectChanges();

    expect(el.textContent).toContain('FUERA DE TOLERANCIA');
  });
});
