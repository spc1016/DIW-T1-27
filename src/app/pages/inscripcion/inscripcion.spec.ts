import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Inscripcion } from './inscripcion';

describe('Inscripcion', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inscripcion],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('debe bloquear envío inválido y mostrar errores accesibles con aria-invalid y aria-describedby', () => {
    const fixture = TestBed.createComponent(Inscripcion);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const form = el.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(el.querySelector('.inscripcion__resguardo')).toBeNull();
    expect(el.querySelectorAll('.campo-carnet__error').length).toBeGreaterThanOrEqual(8);

    const piloto = el.querySelector('#inscripcion-piloto') as HTMLInputElement;
    expect(piloto.getAttribute('aria-invalid')).toBe('true');
    expect(piloto.getAttribute('aria-describedby')).toBe('error-piloto');
  });

  it('debe rechazar correo mal formado y años fuera de 1925-1975', () => {
    const fixture = TestBed.createComponent(Inscripcion);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const setInput = (selector: string, valor: string): void => {
      const input = el.querySelector(selector) as HTMLInputElement;
      input.value = valor;
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
    };

    setInput('#inscripcion-email', 'correo-invalido');
    setInput('#inscripcion-anio', '1990');
    fixture.detectChanges();

    expect(el.querySelector('#error-email')?.textContent).toContain('correo electrónico');
    expect(el.querySelector('#error-anio')?.textContent).toContain('1925 y 1975');
  });

  it('debe generar resguardo al enviar datos válidos y reiniciar limpio con Nueva Inscripción', () => {
    const fixture = TestBed.createComponent(Inscripcion);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const setInput = (selector: string, valor: string): void => {
      const input = el.querySelector(selector) as HTMLInputElement;
      input.value = valor;
      input.dispatchEvent(new Event('input'));
    };

    setInput('#inscripcion-piloto', 'Manuel Valdés');
    setInput('#inscripcion-copiloto', 'Clara Serrano');
    setInput('#inscripcion-email', 'valdes@classicmotor.es');
    setInput('#inscripcion-telefono', '600123456');
    setInput('#inscripcion-modelo', 'Porsche 911 Carrera RS 2.7');
    setInput('#inscripcion-anio', '1973');
    setInput('#inscripcion-potencia', '210 CV');
    setInput('#inscripcion-fiva', 'FIVA-1973-014');

    const selectCat = el.querySelector('#inscripcion-categoria') as HTMLSelectElement;
    selectCat.value = 'GRAN TURISMO';
    selectCat.dispatchEvent(new Event('change'));

    const check = el.querySelector('#inscripcion-reglamento') as HTMLInputElement;
    check.click();

    const form = el.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const resguardo = el.querySelector('.inscripcion__resguardo');
    expect(resguardo).toBeTruthy();
    expect(resguardo?.textContent).toContain('Manuel Valdés / Clara Serrano');
    expect(resguardo?.textContent).toContain('Porsche 911 Carrera RS 2.7 · 1973');
    expect(resguardo?.textContent).toContain('FIVA-1973-014');

    const btnNueva = Array.from(el.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Nueva Inscripción'),
    );
    btnNueva?.click();
    fixture.detectChanges();

    expect(el.querySelector('.inscripcion__resguardo')).toBeNull();
    expect(el.querySelectorAll('.campo-carnet__error').length).toBe(0);
    expect((el.querySelector('#inscripcion-piloto') as HTMLInputElement).value).toBe('');
  });
});
