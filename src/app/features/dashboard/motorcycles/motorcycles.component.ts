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
        <h1 class="text-[1.4rem] font-extrabold">ATENCIONES MECANICAS</h1>
        <time class="font-medium">{{ date | date: 'dd / MM / yyyy' }}</time>
      </header>
      <app-search-bar />
    </section>
    <!-- Motorcycle List -->
    <section class="grid-cols-auto-fill-100 grid auto-rows-[166px]">
      @for (motorcycle of motorcycles(); track motorcycle.id) {
        <app-motorcycle-item [motorcycle]="motorcycle" />
      }
    </section>
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
