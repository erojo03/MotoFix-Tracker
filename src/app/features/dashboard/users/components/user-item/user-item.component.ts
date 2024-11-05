import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [],
  template: `
    <div
      class="flex cursor-pointer items-center justify-between gap-2 rounded-2xl border bg-white px-4 py-3 shadow-sm">
      <div class="flex items-center gap-3">
        <div
          class="flex size-11 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
          <span class="text-sm font-medium text-gray-600"
            >{{ user.firstName.slice(0, 1)
            }}{{ user.lastName.slice(0, 1) }}</span
          >
        </div>
        <div class="flex flex-col">
          <h1 class="text-navy-blue font-semibold">
            {{ user.firstName.split(' ', 1) }} {{ user.lastName.split(' ', 1) }}
          </h1>
          <span class="text-sm font-medium text-gray-500">{{ user.role }}</span>
        </div>
      </div>

      <select class="rounded-lg bg-gray-200 px-2 py-1.5 text-sm">
        <option value="" disabled selected>Asistencia</option>
        <option value="present">Presente</option>
        <option value="absent">Ausente</option>
      </select>

      <div class="flex flex-col gap-2">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-[18px] stroke-blue-600">
            <path
              class=""
              d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path
              d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
          </svg>
        </button>
        
        <button
        (click)="deleteUser(user.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="size-[18px] fill-red-600">
            <path
              d="M53.188 467C54.75 491.844 76.219 512 101.094 512H346.906C371.781 512 393.25 491.844 394.812 467L416 128H32L53.188 467ZM432 32H320L308.422 8.844C305.713 3.424 300.172 0 294.111 0H153.889C147.828 0 142.289 3.424 139.578 8.844L128 32H16C7.164 32 0 39.162 0 48V80C0 88.836 7.164 96 16 96H432C440.838 96 448 88.836 448 80V48C448 39.162 440.838 32 432 32Z" />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: `
    :host {
      width: 100%;
    }

    @media (min-width: 500px) {
      :host {
        width: 468px;
      }
    }
  `,
})
export class UserItemComponent {
  @Input({ required: true }) user = {
    id: '',
    firstName: '',
    lastName: '',
    role: '',
    attendance: '',
  };

  @Output() delete = new EventEmitter<string>();

  deleteUser(id: string): void {
    this.delete.emit(id);
  }
}
