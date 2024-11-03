import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main class="flex-1 overflow-y-auto px-4 pt-4 md:px-0 md:pt-0">
      <router-outlet />
    </main>
  `,
  styles: `
    :host {
      @apply flex h-dvh min-h-screen flex-col-reverse md:flex-col md:px-8 md:gap-4;
    }
  `,
})
export class DashboardComponent {}
