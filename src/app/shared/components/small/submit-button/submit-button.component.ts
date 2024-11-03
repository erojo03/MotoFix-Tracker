import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [],
  template: `
    <button
      (click)="submitEvent()"
      [disabled]="!formValid()"
      type="submit"
      class="w-full rounded-md bg-blue-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 enabled:hover:bg-blue-700 disabled:opacity-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2 inline-block h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
      <span class="hidden sm:inline">{{ text() }}</span>
      <span class="sm:hidden">{{ text().split(' ')[0] }}</span>
    </button>
  `,
  styles: ``,
})
export class SubmitButtonComponent {
  text = input.required<string>();
  formValid = input<boolean>(true);
  @Output() submitForm = new EventEmitter<void>();

  submitEvent(): void {
    this.submitForm.emit();
  }
}
