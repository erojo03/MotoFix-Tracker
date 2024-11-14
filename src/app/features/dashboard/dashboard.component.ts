import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { UserProfileComponent } from './users/components/user-profile/user-profile.component';
import { PopupService } from '../../core/services/utils/popup.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, UserProfileComponent],
  template: `
    <app-navbar />
    <main class="flex-1 overflow-y-auto px-4 pt-4 md:px-0 md:pt-0">
      <router-outlet />
    </main>

    @if (getPopupSate('userProfile')) {
      <section class="content-box">
        <app-user-profile />
      </section>
    }
  `,
  styles: `
    :host {
      @apply flex h-dvh flex-col-reverse bg-gradient-to-b from-white from-80% to-[#ededed] to-100% md:flex-col md:gap-4 md:px-8;
    }
  `,
})
export class DashboardComponent {
  private readonly _popupService = inject(PopupService);

  getPopupSate(key: string) {
    const state = this._popupService.getPopupState(key);
    return state();
  }
}
