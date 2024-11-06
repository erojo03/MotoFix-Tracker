import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-motorcycles',
  standalone: true,
  imports: [SearchBarComponent, DatePipe],
  template: `
    <!-- Header -->
    <section
      class="flex flex-col items-center gap-2.5 md:flex-row md:justify-between">
      <header class="w-full">
        <h1 class="text-[1.4rem] font-extrabold">ATENCIONES MECANICAS</h1>
        <time class="font-medium">{{ date | date: 'dd / MM / yyyy' }}</time>
      </header>
      <app-search-bar />
    </section>

    <!-- Motorcycle List -->
    <section></section>
  `,
  styles: ``,
})
export class MotorcyclesComponent {
  date = new Date();
}
