import { Component, computed, inject, input, OnInit } from '@angular/core';
import { CloseButtonComponent } from '../../../../../shared/components/small/close-button/close-button.component';
import { DatePipe } from '@angular/common';
import { MotorcycleProcessService } from '../../services/motorcycle-process.service';
import { MotorcycleInfo } from '../../interfaces/motorcycle.interface';
import { MotorcycleService } from '../../services/motorcycle.service';
import { PopupService } from '../../../../../core/services/utils/popup.service';
import { CurrentUserService } from '../../../../../core/services/data/current-user.service';
import { UserService } from '../../../../../core/services/data/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-motorcycle-process',
  standalone: true,
  imports: [CloseButtonComponent, DatePipe],
  template: `
    <section
      [class.animate-slide-out]="isClosingPopup()"
      class="animate-slide-in relative flex h-full w-full flex-col items-center gap-4 bg-white p-6 shadow-2xl md:h-3/4 md:w-3/5 md:rounded-2xl">
      <app-close-button popupId="motorcycleProcesses" />

      <!-- Title -->
      <header class="relative">
        <h1 class="text-xl font-bold text-primary">
          {{ motorcycleTitle() }}
        </h1>

        <button class="group absolute -right-10 top-[1px] hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="size-6">
            <path
              class="stroke-[#132c6b]"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>
      </header>

      <!-- Processes List -->
      <ul
        class="flex flex-1 flex-col gap-10 overflow-y-auto pb-1"
        style="scrollbar-width: none">
        @for (
          motorcycleProcess of motorcycleProcesses();
          track motorcycleProcess.process.sequence
        ) {
          @let currentSequence = $count;
          @let user = motorcycleProcess.user;
          @let process = motorcycleProcess.process;
          <li class="relative flex gap-6">
            @if ($index !== $count - 1) {
              <div
                class="absolute left-8 top-14 -ml-0.5 mt-0.5 h-full w-px border-l-4 border-dotted border-gray-300"></div>
            }
            <div
              class="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white shadow">
              <svg
                class="h-10 w-10 text-fuchsia-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <div class="flex flex-col">
              <h3 class="text-lg font-semibold text-black">
                {{ process.description }}
              </h3>
              <!-- Start and End time -->
              <small class="text-base text-gray-600">
                {{ motorcycleProcess.startDate | date: 'shortTime' }}
                @if (process.sequence !== 10) {
                  - {{ motorcycleProcess.endDate | date: 'shortTime' }}
                }
              </small>

              <!-- Text for Received -->
              @if (
                (process.sequence % 2 !== 0 || process.sequence === 4) &&
                process.sequence !== 3 &&
                user
              ) {
                @let userShortName =
                  user.firstName.split(' ')[0] +
                  ' ' +
                  user.lastName.split(' ')[0];
                <small class="text-base text-gray-600">
                  @switch (process.sequence) {
                    @case (1) {
                      Recibido por: {{ userShortName }}
                    }
                    @case (4) {
                      Mecanico Asignado: {{ userShortName }}
                    }
                    @case (5) {
                      Mecanico: {{ userShortName }}
                    }
                    @case (7) {
                      Encargado: {{ userShortName }}
                    }
                    @case (9) {
                      Entrega por: {{ userShortName }}
                    }
                    @default {
                      Atendido por: {{ userShortName }}
                    }
                  }
                </small>
              }

              <!-- Mechanics Available -->
              @if (currentSequence === 3 && process.sequence === 3) {
                <div
                  class="flex flex-wrap items-center gap-2 text-base text-gray-600">
                  <h3>Mecanicos disponibles:</h3>
                  <select
                    (change)="setMechanicId($event)"
                    class="w-max rounded-lg px-2 py-1">
                    <option value="" selected disabled>
                      Elije un Mecanico
                    </option>
                    @for (mechanic of mechanicsAvailable(); track mechanic.id) {
                      @let userShortName =
                        mechanic.firstName.split(' ')[0] +
                        ' ' +
                        mechanic.lastName.split(' ')[0];
                      <option value="{{ mechanic.id }}">
                        {{ userShortName }}
                      </option>
                    }
                  </select>
                </div>

                @if (!mechanicSelected) {
                  <span class="text-red-400">Selecciona un Mecanico</span>
                }
              }
            </div>
          </li>
        }
      </ul>

      <!-- Ver como agregar el boton de casos alternos -->
      <!-- limitar el boton cuando llegue a la ultima secuencia -->
      <div class="flex gap-2 self-end">
        @if (
          (currentProcess === 4 && currentUser.role === 'mechanic') ||
          currentProcess !== 4
        ) {
          <button
            (click)="confirmProcess()"
            class="button group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-none bg-emerald-600 font-semibold shadow-lg transition-all duration-300 hover:w-32 hover:rounded-full hover:bg-emerald-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-6 transition-all duration-300 group-hover:w-7 group-hover:-translate-x-[38px]">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

            <span
              class="absolute top-[-20px] text-[2px] text-white transition-all duration-300 group-hover:translate-x-3.5 group-hover:translate-y-[34px] group-hover:text-sm group-hover:opacity-100"
              >Confirmar</span
            >
          </button>
        }

        <button
          (click)="deleteMotorcycle()"
          class="button group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-none bg-rose-600 font-semibold shadow-lg transition-all duration-300 hover:w-24 hover:rounded-full hover:bg-rose-500">
          <svg
            viewBox="0 0 448 512"
            class="w-3 transition-all duration-300 group-hover:w-[50px] group-hover:translate-y-[60%]">
            <path
              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
              class="fill-white"></path>
          </svg>
          <span
            class="absolute top-[-20px] text-[2px] text-white transition-all duration-300 group-hover:translate-y-[28px] group-hover:text-xs group-hover:opacity-100"
            >Eliminar</span
          >
        </button>
      </div>
    </section>
  `,
  styles: `
    :host {
      @apply content-box p-0;
    }
  `,
})
export class MotorcycleProcessComponent implements OnInit {
  motorcycleInfo = input.required<MotorcycleInfo>({});

  private readonly _motorcycleProcessService = inject(MotorcycleProcessService);
  private readonly _motorcycleService = inject(MotorcycleService);
  private readonly _userService = inject(UserService);
  private readonly _currentUserService = inject(CurrentUserService);
  private readonly _popupService = inject(PopupService);

  motorcycleTitle = computed(
    () => this.motorcycleInfo().brand + ' ' + this.motorcycleInfo().plate
  );

  mechanicId?: string;
  mechanicSelected = true;
  mechanicsAvailable = toSignal(this._userService.getAvailableMechanics());
  motorcycleProcesses = this._motorcycleProcessService.processes;
  isClosingPopup = this._popupService.isClosingPopup;
  currentUser = this._currentUserService;
  currentProcess = 0;

  ngOnInit() {
    this.loadProcesses(this.motorcycleInfo().id);
  }

  setMechanicId(event: Event): void {
    this.mechanicSelected = true;
    this.mechanicId = (event.target as HTMLSelectElement).value;
  }

  loadProcesses(id: number) {
    this._motorcycleProcessService.getProcesses(id).subscribe({
      next: (data) => {
        this.currentProcess = data[data.length - 1].process.sequence;
        console.log(this.currentProcess);
      },
    });
  }

  confirmProcess() {
    const currentSequence =
      this.motorcycleProcesses()[this.motorcycleProcesses().length - 1].process
        .sequence;

    const userId = this.determineUserId(currentSequence);

    if (currentSequence === 3 && !this.mechanicId) {
      this.mechanicSelected = false;
      return;
    }

    this._motorcycleProcessService
      .completeProcess(this.motorcycleInfo().id, currentSequence, userId)
      .subscribe({
        next: () => {
          this.loadProcesses(this.motorcycleInfo().id);
        },
        error: (error) =>
          this.handleError('Error al actualizar el proceso', error),
      });
  }

  deleteMotorcycle(): void {
    const id = this.motorcycleInfo().id;
    this._motorcycleService.removeMoto(id).subscribe({
      next: () => {
        this._popupService.closePopup('motorcycleProcesses');
      },
      error: (error) => this.handleError('Error al eliminar la moto', error),
    });
  }

  private determineUserId(sequence: number): string | undefined {
    if (sequence % 2 === 0) return this.currentUser.id;
    if (sequence === 3 && this.mechanicId) return this.mechanicId;
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(message: string, error: any): void {
    console.error(`${message}:`, error.error?.message || error);
  }
}
