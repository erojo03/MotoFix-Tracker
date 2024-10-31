import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main class="flex-1 overflow-y-auto">
      <router-outlet />
    </main>
  `,
  styles: `
    :host {
      @apply flex flex-col-reverse px-4 min-h-screen h-dvh md:px-8 md:flex-col
    }
  `,
})
export class DashboardComponent {}
