# DIW-T1-27 — I Rally & Concentración Histórica Classic Motor

Portal web oficial del **I Rally & Concentración Histórica Classic Motor**, diseñado bajo el sistema visual **Guía de estilos · Regularidad Clásica (Manual de identidad · Ed. I)** — _«El tiempo exacto, con la elegancia de antes»_ (inspiración automovilística 1925–1975 y precisión de regularidad de ±0,1 s).

---

## Enlaces de Entrega

- **Repositorio público Git**: https://github.com/spc1016/DIW-T1-27
- **Aplicación en producción**: https://diw-t1-27.vercel.app

---

## Sistema Visual · Regularidad Clásica (Manual de identidad · Ed. I)

- **Paleta cromática de 5 colores + acabado cromado**:
  - Marfil `#EEE8DC` (52% — fondo de página y esfera analógica)
  - Verde carreras `#1F3B2D` (26% — cabecera, acciones principales y tarjetas de tramo)
  - Tinta `#141816` (12% — tipografía principal, _tripmaster_ digital y pie institucional)
  - Cuero coñac `#A36A3A` (6% — etiquetas, foco accesible `:focus-visible`, costuras y fila líder al 10%)
  - Burdeos `#6B1F2A` (4% — penalizaciones, alertas, seguimiento en directo y aguja del cronómetro)
  - Tolerancias y filetes: `#9EC7A8` (`<= ±0,5 s`), `#E3A0A8` (`> ±0,5 s`), `rgba(20, 24, 22, 0.14)` y degradado cromado metálico de 5 paradas restringido a filetes de `2–3 px`, biseles y botones secundarios.
- **Tipografía**: `Bodoni Moda` (titulares, dorsales y cursiva emocional en tramos/citas), `Barlow` (cuerpo) y `Barlow Condensed` (etiquetas mayúsculas y botones), con numerales `tabular-nums lining-nums` en toda cifra técnica y alineación derecha en tablas.
- **Biblioteca de componentes Ed. I**:
  - `CuadroInstrumentos` (`src/app/cuadro-instrumentos/`): esfera marfil analógica con aguja burdeos (`cubic-bezier(.4, 2.2, .6, 1)`) + _tripmaster_ digital sobre tinta `#141816`.
  - Botones (`.boton--primario`, `--secundario`, `--terciario`, `--alerta`), campos sin caja _Carnet de ruta_ (`.campo-carnet`), placas semánticas (`12–16%`), dorsales circulares de `72 px` (`.dorsal-circular`), tarjetas de tramo de 3 columnas (`.tarjeta-tramo`) y tablas de clasificación responsivas (`.tabla-clasificacion`).

---

## Arquitectura Técnica (Angular 22)

- **Standalone Components** sin `@NgModule`, `styleUrl` singular, sin sufijo `.component`, inyección con `inject()`, parámetros de ruta reactivos mediante `input.required<string>()` (`withComponentInputBinding()`) + `computed()`, y control de flujo nativo (`@if`, `@for`).
- **Servicios de datos locales**: `NavegacionService` (`src/app/navegacion-service.ts`) y `VehiculoService` (`src/app/vehiculo-service.ts`) con colecciones `private readonly` y contrato `obtenerTodas`, `obtenerPorId` e `idSiguiente`.
- **Rutas activas**: `/inicio`, `/catalogo`, `/catalogo/:id`, `/itinerario/programa`, `/itinerario/recorrido`, `/inscripcion`, `/guia-estilo` y ruta comodín `**` (`NoEncontrado` `404`).
- **Maquetación Mobile-First**: rejilla CSS Grid de 4 (`<768px`), 8 (`768px–1023px`) y 12 columnas (`1024px+`, máximo `1320px`), conversión tabla-a-tarjeta en móvil y áreas táctiles mínimas de `48 px`.

---

## Comandos de Desarrollo, Pruebas y Compilación

```bash
# Servidor de desarrollo local
npx ng serve

# Ejecutar suite completa de pruebas unitarias y de rutas (Vitest)
npx ng test --watch=false

# Compilación de producción (verificando presupuestos de angular.json)
npx ng build

# Verificación de formato (Prettier)
npx prettier --check "src/**/*.{ts,html,scss}"
```

---

## Declaración de Herramientas de IA y Autoría

Durante el desarrollo de este proyecto se han utilizado herramientas de asistencia con Inteligencia Artificial (asistentes de programación y generación guiada mediante especificaciones Spec-Kit) como apoyo en la redacción de especificaciones, maquetación SCSS/BEM, estructuración de componentes Angular Standalone y batería de pruebas unitarias, siendo todo el código revisado, comprendido y validado por el alumno.

> «El alumno debe ser capaz de explicar y modificar en directo cualquier parte de su código; lo que no sepa explicar no se considerará de su autoría»
