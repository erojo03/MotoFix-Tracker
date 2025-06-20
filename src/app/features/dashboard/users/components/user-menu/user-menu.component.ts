import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrentUserService } from '../../../../../core/services/data/current-user.service';
import { PopupService } from '../../../../../core/services/utils/popup.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1 class="text-center text-[22px] font-extrabold text-primary">
      USUARIOS
    </h1>

    <div class="flex flex-col">
      <button
        (click)="openPopup('userProfile')"
        (click)="clickOutsideEvent()"
        class="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-[rgba(245,245,245)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="size-7">
          <path
            d="M256 16C123.451 16 16 123.451 16 256S123.451 496 256 496S496 388.549 496 256S388.549 16 256 16ZM256 128C295.766 128 328 160.236 328 200S295.766 272 256 272C216.238 272 184 239.764 184 200S216.238 128 256 128ZM256 432C202.807 432 155.154 408.184 122.855 370.766C141.658 340.402 174.998 320 213.334 320H298.666C337.006 320 370.344 340.4 389.145 370.764C356.844 408.184 309.193 432 256 432Z" />
        </svg>
        Perfil
      </button>

      @if (currentRole === 'admin') {
        <a
          routerLink="/users"
          (click)="clickOutsideEvent()"
          class="flex cursor-pointer items-center gap-1.5 rounded-xl py-2 pl-1.5 pr-2 hover:bg-[rgba(245,245,245)]">
          <svg
            fill="#000000"
            width="32px"
            height="32px"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M258.9,48C141.92,46.42,46.42,141.92,48,258.9,49.56,371.09,140.91,462.44,253.1,464c117,1.6,212.48-93.9,210.88-210.88C462.44,140.91,371.09,49.56,258.9,48Zm-3.68,152.11c.21-1.2.44-2.4.71-3.59a66.46,66.46,0,0,1,16.29-31.21C285.11,151.58,303.38,144,323.67,144a74.05,74.05,0,0,1,25.06,4.26A66.69,66.69,0,0,1,375,165.46a68.15,68.15,0,0,1,18,42.14A78.46,78.46,0,0,1,393,219h0a86.19,86.19,0,0,1-8.2,31q-.76,1.59-1.59,3.15c-1.11,2.07-2.3,4.1-3.58,6.06a79.47,79.47,0,0,1-8.63,11c-13.12,14-29.92,21.73-47.31,21.73a59.61,59.61,0,0,1-19.17-3.18,63.47,63.47,0,0,1-6.1-2.43,70.76,70.76,0,0,1-22.07-16.12,83.76,83.76,0,0,1-22-51.32q-.27-3.88-.18-7.68A75.62,75.62,0,0,1,255.22,200.13ZM105.49,224.45a59.87,59.87,0,0,1,5.2-20.64,56.76,56.76,0,0,1,2.78-5.3,54.49,54.49,0,0,1,7.19-9.56,55.62,55.62,0,0,1,14-10.82,56.84,56.84,0,0,1,8.11-3.64,63.85,63.85,0,0,1,33.35-2.39,57,57,0,0,1,30.78,17,57.86,57.86,0,0,1,15.41,38.62c.05,2.11,0,4.23-.15,6.38a71.58,71.58,0,0,1-6,23.84,69.49,69.49,0,0,1-5.73,10.42,65.39,65.39,0,0,1-15.76,16.57C193.17,286,191.61,287,190,288a54.21,54.21,0,0,1-10,4.65,49.31,49.31,0,0,1-16.2,2.76c-.93,0-1.86,0-2.78-.08a47.6,47.6,0,0,1-5.48-.62,51.19,51.19,0,0,1-5.35-1.23,53.54,53.54,0,0,1-7.72-2.89c-.84-.39-1.66-.8-2.48-1.23-18-9.49-31.57-29.16-34.23-52.12-.12-1.05-.22-2.1-.29-3.16A66.59,66.59,0,0,1,105.49,224.45Zm53.92,178.6A177.27,177.27,0,0,1,97.47,332.4a4,4,0,0,1,1.62-5.26C117.67,316.69,141.4,311,163.82,311c17,0,30.7,2,42.69,5.88a8,8,0,0,1,2.59,13.77c-23.35,19-38.4,42.54-45.47,70.75v0A2.77,2.77,0,0,1,159.41,403.05ZM256,432a175.12,175.12,0,0,1-65.7-12.72,4,4,0,0,1-2.4-4.46c.4-2.05.84-3.92,1.23-5.48,7.12-28.43,24.76-52,51-68.18,23.29-14.35,53-22.25,83.52-22.25,31.16,0,60,7.58,83.48,21.91h0a2.72,2.72,0,0,1,.91,3.67A176.1,176.1,0,0,1,256,432Z" />
          </svg>
          Todos los usuarios
        </a>
      }

      <hr class="my-1" />

      <button
        (click)="logOut()"
        class="flex items-center justify-center gap-2 rounded-xl px-3 py-2 hover:bg-[rgba(245,245,245)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="size-5">
          <path
            d="M96 480H160C177.673 480 192 465.673 192 448V448C192 430.327 177.673 416 160 416H96C78.327 416 64 401.673 64 384V128C64 110.327 78.327 96 96 96H160C177.673 96 192 81.673 192 64V64C192 46.327 177.673 32 160 32H96C42.981 32 0 74.981 0 128V384C0 437.019 42.981 480 96 480Z"
            class="opacity-40" />
          <path
            d="M504.73 273.451L360.629 409.451C353.654 416.029 343.428 417.826 334.625 414.045C325.822 410.248 320.115 401.576 320.115 391.998V319.998H192.023C174.336 319.998 160 305.672 160 287.998V223.998C160 206.326 174.336 191.998 192.023 191.998H320.115V119.998C320.115 110.42 325.822 101.748 334.625 97.951C343.428 94.17 353.654 95.967 360.629 102.545L504.73 238.545C514.332 247.607 514.332 264.389 504.73 273.451Z" />
        </svg>
        Cerrar sesión
      </button>
    </div>
  `,
  styles: `
    :host {
      @apply absolute right-5 top-16 z-10 flex flex-col gap-2 rounded-2xl border bg-white p-4 shadow-md;
    }
  `,
})
export class UserMenuComponent {
  @Output() clickOutside = new EventEmitter<void>();

  private readonly _router = inject(Router);
  private readonly _currentUser = inject(CurrentUserService);
  private readonly _popupService = inject(PopupService);

  currentRole = this._currentUser.role;

  clickOutsideEvent() {
    this.clickOutside.emit();
  }

  openPopup(key: string): void {
    this._popupService.openPopup(key);
  }

  logOut(): void {
    localStorage.removeItem('session');
    this._router.navigate(['/login']);
  }
}
