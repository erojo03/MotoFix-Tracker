import { Component, inject, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { DatePipe } from '@angular/common';
import { MotorcycleItemComponent } from './components/motorcycle-item/motorcycle-item.component';
import { MotorcycleService } from './services/motorcycle.service';

@Component({
  selector: 'app-motorcycles',
  standalone: true,
  imports: [SearchBarComponent, DatePipe, MotorcycleItemComponent],
  template: `
    <!-- Header -->
    <section
      class="flex flex-col items-center gap-2.5 md:flex-row md:justify-between">
      <header class="w-full">
        <h1 class="text-[1.4rem] font-extrabold text-primary">
          ATENCIONES MECANICAS
        </h1>
        <time class="font-medium">{{ date | date: 'dd / MM / yyyy' }}</time>
      </header>
      <app-search-bar />
    </section>
    <!-- Motorcycle List -->
    <section class="grid auto-rows-[166px] grid-cols-auto-fill-100 gap-4">
      @for (motorcycle of motorcycles(); track motorcycle.id) {
        <app-motorcycle-item [motorcycle]="motorcycle" />
      }
    </section>

    <!-- Add Button -->
    <button
      class="absolute bottom-[26px] right-1/2 translate-x-1/2 rounded-full bg-red-500 p-3 text-white shadow-lg md:bottom-0 md:right-0 md:m-8 md:translate-x-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-8 w-8">
        <path d="M5 12h14"></path>
        <path d="M12 5v14"></path>
      </svg>
    </button>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
    }
  `,
})
export class MotorcyclesComponent implements OnInit {
  private readonly _motorcycleService = inject(MotorcycleService);

  date = new Date();
  motorcycles = this._motorcycleService.motorcycles;

  ngOnInit(): void {
    this.loadMotorcycles();
  }

  loadMotorcycles() {
    this._motorcycleService.getMotos().subscribe();
  }
}
