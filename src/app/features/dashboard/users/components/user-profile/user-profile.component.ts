import { Component, inject } from '@angular/core';
import { CurrentUserService } from '../../../../../core/services/data/current-user.service';
import { RoleService } from '../../../../../core/services/data/role.service';
import { CloseButtonComponent } from '../../../../../shared/components/small/close-button/close-button.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CloseButtonComponent],
  template: `
    <app-close-button
      class="!right-2 !top-2.5 hidden md:block"
      popupId="userProfile" />

    <header
      class="flex flex-col items-center justify-center gap-2.5 bg-gradient-to-r from-blue-500 to-blue-600 p-6">
      <!-- role image -->
      <img
        src="assets/roles/recepcionista.svg"
        alt="recepcionista"
        class="size-40" />
      <h2 class="text-center text-3xl font-bold text-white">¡Bienvenido/a!</h2>
    </header>

    <div class="flex w-full flex-col gap-4 overflow-y-auto bg-white p-4">
      <h3 class="text-lg font-medium tracking-tight">
        Información del Usuario
      </h3>

      <div class="flex items-center gap-3 rounded-lg bg-[#F9F9FA] p-3">
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
          class="size-5 text-[#71717A]">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <div class="flex-1">
          <p class="text-sm text-[#71717A]">Nombre</p>
          <p class="font-medium">{{ currentUser.fullName }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3 rounded-lg bg-[#F9F9FA] p-3">
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
          class="size-5 text-[#71717A]">
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <div class="flex-1">
          <p class="text-sm text-[#71717A]">Teléfono</p>
          <p class="font-medium">{{ currentUser.phone }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3 rounded-lg bg-[#F9F9FA] p-3">
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
          class="h-5 w-5 text-[#71717A]">
          <path
            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        </svg>
        <div class="flex-1">
          <p class="text-sm text-[#71717A]">Rol</p>
          <p class="font-medium">{{ translateRole(currentUser.role) }}</p>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      position: relative;
      display: flex;
      width: 100%;
      max-width: 28rem; /* 28rem is equivalent to max-w-md */
      flex-direction: column;
      overflow: hidden;
      border-radius: 0.5rem; /* rounded-lg */
      border-width: 1px; /* border */
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
    }

    @media (min-width: 768px) {
      :host {
        max-width: 40rem; /* 36rem is equivalent to max-w-lg */
        flex-direction: row;
        border: none;
      }
    }
  `,
})
export class UserProfileComponent {
  private readonly _currentUser = inject(CurrentUserService);
  private readonly _roleService = inject(RoleService);

  currentUser = this._currentUser;

  translateRole(roleName: string): string {
    return this._roleService.translateRole(roleName);
  }
}
