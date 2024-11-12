import { Component, Input, model } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="absolute left-3 top-1/2 size-4 -translate-y-1/2 fill-[#DC5054]">
      <path
        d="M504.971 448.402L380.623 324.053C402.953 290.902 416 250.977 416 208C416 93.125 322.875 0 208 0S0 93.125 0 208S93.125 416 208 416C250.977 416 290.902 402.953 324.053 380.623L448.402 504.971C457.775 514.344 472.971 514.344 482.344 504.971L504.971 482.344C514.344 472.971 514.344 457.775 504.971 448.402ZM80 208C80 137.42 137.42 80 208 80S336 137.42 336 208C336 278.578 278.58 336 208 336S80 278.578 80 208Z" />
    </svg>
    <input
      (keyup)="onSearchInputChange($event)"
      type="text"
      placeholder="Buscar {{ placeholder }}..."
      class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-8 text-sm text-gray-900" />
  `,
  styles: `
    :host {
      @apply relative w-full md:w-72;
    }
  `,
})
export class SearchBarComponent {
  @Input() placeholder = '';
  searchValue = model.required<string>();

  onSearchInputChange(event: KeyboardEvent) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue.set(inputValue);
  }
}
