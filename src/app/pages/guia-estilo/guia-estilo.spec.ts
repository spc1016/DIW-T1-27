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

  it('debe renderizar la paleta 60/25/10/5 y los cinco acabados materiales', () => {
    const fixture = TestBed.createComponent(GuiaEstilo);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('British Racing Green');
    expect(el.textContent).toContain('Vintage Bordeaux');
    expect(el.querySelector('.chrome-bezel')).toBeTruthy();
    expect(el.querySelector('.instrument-dial')).toBeTruthy();
    expect(el.querySelector('.leather-panel')).toBeTruthy();
    expect(el.querySelector('.enamel-green')).toBeTruthy();
    expect(el.querySelector('.enamel-bordeaux')).toBeTruthy();
    expect(el.querySelectorAll('.placa-dorsal__remache').length).toBe(4);
  });

  it('debe actualizar la escala vernier y conmutar el testigo luminoso de demostración', () => {
    const fixture = TestBed.createComponent(GuiaEstilo);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('0.0s · REGULARIDAD ÓPTIMA');

    const botones = Array.from(el.querySelectorAll('button'));
    const btnAdelanto = botones.find((b) => b.textContent?.includes('Simular Adelanto'));
    const btnRetraso = botones.find((b) => b.textContent?.includes('Simular Retraso'));
    const btnTestigo = botones.find((b) => b.textContent?.includes('Testigo:'));

    btnAdelanto?.click();
    fixture.detectChanges();
    expect(el.textContent).toContain('-0.4s · ADELANTO');
    expect(el.querySelector('.vernier__aguja--adelanto')).toBeTruthy();

    btnRetraso?.click();
    fixture.detectChanges();
    expect(el.textContent).toContain('+0.8s · PENALIZACIÓN');
    expect(el.querySelector('.vernier__aguja--penalizacion')).toBeTruthy();

    btnTestigo?.click();
    fixture.detectChanges();
    expect(btnTestigo?.textContent).toContain('Apagado');
  });
});
