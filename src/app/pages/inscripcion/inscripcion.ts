import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PageShellMeta } from '../../navegacion-service';

export interface SolicitudInscripcion {
  referencia: string;
  piloto: string;
  copiloto: string;
  email: string;
  telefono: string;
  modelo: string;
  anio: number;
  categoria: string;
  potencia: string;
  pasaporteFiva: string;
}

type CampoInscripcion =
  | 'piloto'
  | 'copiloto'
  | 'email'
  | 'telefono'
  | 'modelo'
  | 'anio'
  | 'categoria'
  | 'potencia'
  | 'pasaporteFiva'
  | 'aceptaReglamento';

const MENSAJES_ERROR: Record<CampoInscripcion, string> = {
  piloto: 'Indique nombre y apellidos del piloto titular (mínimo 3 caracteres).',
  copiloto: 'Indique nombre y apellidos del copiloto (mínimo 3 caracteres).',
  email: 'Introduzca un correo electrónico de contacto válido.',
  telefono: 'Indique un teléfono de contacto válido (9–15 dígitos).',
  modelo: 'Indique marca y modelo del vehículo participante.',
  anio: 'Solo se admiten vehículos fabricados entre 1925 y 1975.',
  categoria: 'Seleccione una categoría reglamentaria.',
  potencia: 'Indique la potencia homologada aproximada (ej. 130 CV).',
  pasaporteFiva: 'Introduzca pasaporte FIVA o matrícula histórica (4–20 caracteres).',
  aceptaReglamento: 'Debe aceptar el reglamento de regularidad clásica.',
};

@Component({
  selector: 'app-inscripcion',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './inscripcion.html',
  styleUrl: './inscripcion.scss',
})
export class Inscripcion {
  private readonly fb = inject(FormBuilder);

  protected readonly cabecera: PageShellMeta = {
    etiquetaTecnica: 'CARNET DE RUTA · VERIFICACIONES ADMINISTRATIVAS',
    titulo: 'Inscripción de Equipo y Vehículo',
    subtitulo:
      'Complete la solicitud oficial de participación para el parque cerrado (vehículos 1925–1975).',
  };

  protected readonly categorias: readonly string[] = [
    'PRE-1960 CLÁSICO',
    'GRAN TURISMO',
    'TURISMO HISTÓRICO',
    'SPORT CLÁSICO',
  ];

  protected readonly formulario = this.fb.group({
    piloto: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    copiloto: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    telefono: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^[0-9+\s-]{9,15}$/),
    ]),
    modelo: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    anio: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1925),
      Validators.max(1975),
    ]),
    categoria: this.fb.nonNullable.control('', [Validators.required]),
    potencia: this.fb.nonNullable.control('', [Validators.required]),
    pasaporteFiva: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9-]{4,20}$/),
    ]),
    aceptaReglamento: this.fb.nonNullable.control(false, [Validators.requiredTrue]),
  });

  protected readonly intentado = signal(false);
  protected readonly resguardo = signal<SolicitudInscripcion | null>(null);

  protected esInvalido(campo: CampoInscripcion): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && (control.touched || this.intentado());
  }

  protected mensajeError(campo: CampoInscripcion): string {
    return MENSAJES_ERROR[campo];
  }

  protected enviarInscripcion(): void {
    this.intentado.set(true);
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      return;
    }

    const v = this.formulario.getRawValue();
    this.resguardo.set({
      referencia: `REG-2026-${String(v.anio ?? 1973).slice(-2)}7`,
      piloto: v.piloto.trim(),
      copiloto: v.copiloto.trim(),
      email: v.email.trim(),
      telefono: v.telefono.trim(),
      modelo: v.modelo.trim(),
      anio: Number(v.anio),
      categoria: v.categoria,
      potencia: v.potencia.trim(),
      pasaporteFiva: v.pasaporteFiva.trim().toUpperCase(),
    });
  }

  protected nuevaInscripcion(): void {
    this.resguardo.set(null);
    this.intentado.set(false);
    this.formulario.reset({
      piloto: '',
      copiloto: '',
      email: '',
      telefono: '',
      modelo: '',
      anio: null,
      categoria: '',
      potencia: '',
      pasaporteFiva: '',
      aceptaReglamento: false,
    });
  }
}
