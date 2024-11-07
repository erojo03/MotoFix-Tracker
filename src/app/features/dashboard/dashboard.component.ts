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
      @apply flex h-dvh flex-col-reverse bg-gradient-to-b from-white from-80% to-[#ededed] to-100% md:flex-col md:gap-4 md:px-8;
    }
  `,
})
export class DashboardComponent {}
