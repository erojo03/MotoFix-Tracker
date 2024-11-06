import { Component, input } from '@angular/core';
import { MotorcycleList } from '../../interfaces/motorcycle.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-motorcycle-item',
  standalone: true,
  imports: [DatePipe],
  template: `
    @let brand = motorcycle().brand.name;
    @let model = motorcycle().model.name;
    @let arrivalDate = motorcycle().arrivalDate;
    @let deliveryDate = motorcycle().deliveryDate;
    @let currentProcess = motorcycle().currentProcess.description;
    <div
      class="flex w-full cursor-pointer flex-col gap-2 rounded-lg border p-4 shadow-sm">
      <div class="flex flex-row items-center justify-between space-y-0">
        @let motoName = brand + ' ' + model;
        <div>
          <h3
            class="whitespace-nowrap text-lg font-medium tracking-tight text-primary">
            {{ motoName }}
          </h3>
          <h3
            class="whitespace-nowrap text-lg font-medium tracking-tight text-primary">
            {{ motorcycle().plate }}
          </h3>
        </div>
        <img
          [alt]="brand"
          class="max-h-14 w-32 object-contain"
          [src]="'assets/moto-logo/' + brand.toLowerCase() + '.svg'" />
      </div>

      <div class="flex items-center justify-between">
        <div class="flex flex-col items-start">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2 h-4 w-4 text-blue-500 opacity-70">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            <span class="text-muted-foreground text-sm">{{
              arrivalDate | date: 'dd/MM/yyyy'
            }}</span>
          </div>

          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2 h-4 w-4 text-blue-500 opacity-70">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="text-muted-foreground text-sm">{{
              arrivalDate | date: 'hh:mm a'
            }}</span>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-right h-4 w-4 opacity-70">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>

        <div class="flex flex-col items-end">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2 h-4 w-4 text-green-500 opacity-70">
              <path
                d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
              <path d="M15 18H9"></path>
              <path
                d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
              <circle cx="17" cy="18" r="2"></circle>
              <circle cx="7" cy="18" r="2"></circle>
            </svg>
            <span class="text-muted-foreground text-sm">{{
              deliveryDate | date: 'dd/MM/yyyy' || 'N/A'
            }}</span>
          </div>

          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2 h-4 w-4 text-green-500 opacity-70">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="text-muted-foreground text-sm">{{
              deliveryDate | date: 'hh:mm a' || 'N/A'
            }}</span>
          </div>
        </div>
      </div>

      <div
        [style]="'background-color: ' + statusColor"
        class="inline-flex w-fit items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold text-white">
        {{ currentProcess || '' }}
      </div>
    </div>
  `,
  styles: ``,
})
export class MotorcycleItemComponent {
  motorcycle = input.required<MotorcycleList>();
  statusColor = input<string>();
}
