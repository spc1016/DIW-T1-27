import { TestBed } from '@angular/core/testing';
import { CuadroInstrumentos } from './cuadro-instrumentos';

describe('CuadroInstrumentos', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuadroInstrumentos],
    }).compileComponents();
  });

  it('debe mostrar la esfera marfil y el tripmaster en estado ideal por defecto', () => {
    const fixture = TestBed.createComponent(CuadroInstrumentos);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.instrumento__esfera')).toBeTruthy();
    expect(el.querySelector('.instrumento__tripmaster')).toBeTruthy();
    expect(el.textContent).toContain('DENTRO DE TOLERANCIA (±0,5 s)');
    expect(el.querySelector('.instrumento__estado--ok')).toBeTruthy();
  });

  it('debe alternar entre lectura en margen (#9EC7A8) y fuera de tolerancia (#E3A0A8) moviendo la aguja', () => {
    const fixture = TestBed.createComponent(CuadroInstrumentos);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const botones = Array.from(el.querySelectorAll('button'));
    const btnFuera = botones.find((b) => b.textContent?.includes('Penalización'));
    const btnMargen = botones.find((b) => b.textContent?.includes('En margen'));

    btnFuera?.click();
    fixture.detectChanges();
    expect(el.textContent).toContain('FUERA DE TOLERANCIA (> ±0,5 s)');
    expect(el.querySelector('.instrumento__estado--fuera')).toBeTruthy();
    expect((el.querySelector('.instrumento__aguja') as HTMLElement).style.transform).toContain(
      '56deg',
    );

    btnMargen?.click();
    fixture.detectChanges();
    expect(el.querySelector('.instrumento__estado--ok')).toBeTruthy();
    expect((el.querySelector('.instrumento__aguja') as HTMLElement).style.transform).toContain(
      '-22deg',
    );
  });
});
