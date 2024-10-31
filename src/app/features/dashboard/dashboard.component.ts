import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main class="flex-1 overflow-y-auto px-4 pt-4 md:pt-0 md:px-0">
      <router-outlet />
    </main>
  `,
  styles: `
    :host {
      @apply flex flex-col-reverse md:px-8 min-h-screen h-dvh md:flex-col
    }
  `,
})
export class DashboardComponent {}
