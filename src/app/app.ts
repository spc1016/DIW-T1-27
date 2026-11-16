import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavegacionService } from './navegacion-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly navegacionService = inject(NavegacionService);
  private readonly router = inject(Router);

  protected readonly menuAbierto = signal(false);
  protected readonly enlacesPrincipales = computed(() =>
    this.navegacionService.obtenerTodas('principal'),
  );

  private readonly cierreAutomatico = this.router.events
    .pipe(
      filter((evento) => evento instanceof NavigationEnd),
      takeUntilDestroyed(),
    )
    .subscribe(() => {
      this.cerrarMenu();
    });

  protected alternarMenu(): void {
    this.menuAbierto.update((abierto) => !abierto);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }

  @HostListener('document:keydown.escape')
  protected alPulsarEscape(): void {
    if (this.menuAbierto()) {
      this.cerrarMenu();
    }
  }
}
