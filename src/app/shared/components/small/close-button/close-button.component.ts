import { Component, inject, Input } from '@angular/core';
import { PopupService } from '../../../../core/services/utils/popup.service';

@Component({
  selector: 'app-close-button',
  standalone: true,
  imports: [],
  template: `
    <button
      (click)="close(popupId)"
      aria-label="Cerrar formulario"
      class="size-10 transform rounded-full bg-gray-100 text-gray-600 transition-all duration-300 ease-in-out hover:rotate-90 hover:scale-110 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="m-auto h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  `,
  styles: ` 
    :host {
      position: absolute;
      right: 1.4rem;
      top: 1.4rem;
    }
  `,
})
export class CloseButtonComponent {
  @Input() popupId = '';

  private readonly _popupService = inject(PopupService);

  close(popupId: string) {
    this._popupService.closePopup(popupId);
  }
}
