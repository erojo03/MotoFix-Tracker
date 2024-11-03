import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1 class="text-navy-blue px-6 text-[1.4rem] font-extrabold">
      NOTIFICACIONES
    </h1>
    <main></main>

    <a
      routerLink="/notifications"
      (click)="clickOutsideEvent()"
      class="rounded-lg bg-[#132c6b] px-4 py-1 font-medium text-white"
      >Ver más</a
    >
  `,
  styles: `
    :host {
      @apply absolute right-5 top-16 z-10 flex flex-col items-center gap-2 rounded-2xl border bg-white p-4 shadow-md;
    }
  `,
})
export class NotificationMenuComponent {
  @Output() clickOutside = new EventEmitter<void>();

  clickOutsideEvent() {
    this.clickOutside.emit();
  }
}
