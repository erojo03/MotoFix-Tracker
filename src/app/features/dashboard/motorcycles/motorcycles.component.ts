import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { DatePipe } from '@angular/common';
import { MotorcycleItemComponent } from './components/motorcycle-item/motorcycle-item.component';
import { MotorcycleService } from './services/motorcycle.service';
import { PopupService } from '../../../core/services/utils/popup.service';
import { MotorcycleAddComponent } from './components/motorcycle-add/motorcycle-add.component';
import { BrandService } from './services/brand.service';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { MotorcycleProcessComponent } from './components/motorcycle-process/motorcycle-process.component';
import {
  MotorcycleInfo,
  MotorcycleList,
} from './interfaces/motorcycle.interface';

@Component({
  selector: 'app-motorcycles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SearchBarComponent,
    DatePipe,
    MotorcycleItemComponent,
    MotorcycleAddComponent,
    FilterPipe,
    MotorcycleProcessComponent,
  ],
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
      <app-search-bar [(searchValue)]="searchValue" />
    </section>

    <!-- Motorcycle List -->
    <section
      class="grid auto-rows-[166px] grid-cols-auto-fill-100 gap-4 overflow-y-auto pb-4">
      @for (
        motorcycle of motorcycles()
          | filter: searchValue() : ['plate', 'brand.name', 'model.name'];
        track motorcycle.id
      ) {
        <app-motorcycle-item
          [motorcycle]="motorcycle"
          (click)="openPopup('motorcycleProcesses')"
          (click)="getMotorcycleForProcess(motorcycle)" />
      }
    </section>

    <!-- Add Button -->
    <button
      (click)="openPopup('motorcycleAdd')"
      class="absolute bottom-[26px] right-1/2 translate-x-1/2 rounded-full bg-red-500 p-3 text-white shadow-lg duration-300 hover:rotate-90 md:bottom-0 md:right-0 md:m-8 md:translate-x-0"
      aria-label="add">
      <svg
        xmlns="http://www.w3.org/2000/svg"
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

    <!-- Motorcycle Add -->
    @if (popupState('motorcycleAdd')) {
      <app-motorcycle-add [brands]="brands()" />
    }

    <!-- Motorcycle Processes -->
    @if (popupState('motorcycleProcesses')) {
      <app-motorcycle-process [motorcycleInfo]="motorcycleForProcess()" />
    }
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
  private readonly _brandService = inject(BrandService);
  private readonly _popupService = inject(PopupService);

  date = new Date();
  brands = this._brandService.brands;
  motorcycles = this._motorcycleService.motorcycles;
  motorcycleForProcess = signal<MotorcycleInfo>({
    id: 0,
    brand: '',
    plate: '',
  });
  searchValue = signal('');

  ngOnInit(): void {
    this.loadMotorcycles();
    this.loadBrands();
  }

  getMotorcycleForProcess(motorcycle: MotorcycleList) {
    const { id, brand, plate } = motorcycle;
    const data = { id, brand: brand.name, plate };
    this.motorcycleForProcess.set(data);
  }

  openPopup(key: string): void {
    this._popupService.openPopup(key);
  }

  popupState(key: string): boolean {
    const state = this._popupService.getPopupState(key);
    return state();
  }

  private loadMotorcycles() {
    this._motorcycleService.getMotos().subscribe();
  }

  private loadBrands(): void {
    this._brandService.getBrands().subscribe();
  }
}
