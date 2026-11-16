import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Catalogo } from './pages/catalogo/catalogo';
import { Detalle } from './pages/detalle/detalle';
import { Itinerario } from './pages/itinerario/itinerario';
import { ItinerarioPrograma } from './pages/itinerario/programa/itinerario-programa';
import { ItinerarioRecorrido } from './pages/itinerario/recorrido/itinerario-recorrido';
import { Inscripcion } from './pages/inscripcion/inscripcion';
import { GuiaEstilo } from './pages/guia-estilo/guia-estilo';
import { NoEncontrado } from './pages/no-encontrado/no-encontrado';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'catalogo', component: Catalogo },
  { path: 'catalogo/:id', component: Detalle },
  {
    path: 'itinerario',
    component: Itinerario,
    children: [
      { path: '', redirectTo: 'programa', pathMatch: 'full' },
      { path: 'programa', component: ItinerarioPrograma },
      { path: 'recorrido', component: ItinerarioRecorrido },
    ],
  },
  { path: 'inscripcion', component: Inscripcion },
  { path: 'guia-estilo', component: GuiaEstilo },
  { path: '**', component: NoEncontrado },
];
