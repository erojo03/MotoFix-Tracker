import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BreakpointService } from '../../../core/services/utils/breakpoints.service';
import { AsyncPipe } from '@angular/common';
import { UserMenuComponent } from '../../../features/dashboard/users/components/user-menu/user-menu.component';
import { NotificationMenuComponent } from '../../../features/dashboard/notifications/components/notification-menu/notification-menu.component';

interface NavItem {
  icon: string;
  link: string;
  type: 'regular' | 'solid';
  childVisibility?: 'hidden' | 'block';
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    UserMenuComponent,
    NotificationMenuComponent,
  ],
  template: `
    @let isMobile = isMobile$ | async;
    <nav class="relative flex items-center justify-center bg-white py-3">
      @if (!isMobile) {
        <div class="flex-1">
          <h1>MG2</h1>
          <h2>Performance</h2>
        </div>
      }

      <!-- Primary Navigation -->
      <div class="flex flex-1 justify-around md:justify-center md:gap-8">
        @for (item of primaryNavItems; track item.link) {
          <a [routerLink]="item.link" routerLinkActive="active">
            <svg [class]="isMobile ? 'size-[26px]' : 'size-[30px]'">
              <use [attr.xlink:href]="getIconPath(item)"></use>
            </svg>
          </a>
        }
      </div>

      <!-- Space for button -->
      @if (isMobile && route === '/motorcycles') {
        <div class="h-7 w-14">
          <div
            class="absolute -top-[21px] left-1/2 h-10 w-20 -translate-x-1/2 translate-y-1/2 rounded-b-full border-b border-l border-r bg-[#F2F2F2]"></div>
        </div>
      }

      <!-- Secondary Navigation -->
      <div class="flex flex-1 justify-around md:justify-end md:gap-8">
        @if (isMobile) {
          @for (item of secondaryNavItems; track item.link) {
            <a [routerLink]="item.link" routerLinkActive="active">
              <svg class="size-[26px]">
                <use [attr.xlink:href]="getIconPath(item)"></use>
              </svg>
            </a>
          }
        } @else {
          @for (item of secondaryNavItems; track item.link) {
            <button class="btn-navbar" (click)="showMenu(item)">
              <svg class="size-[30px]">
                <use [attr.xlink:href]="getIconPath(item)"></use>
              </svg>
            </button>
          }
        }
      </div>
    </nav>

    <!-- Notification Menu -->
    @if (secondaryNavItems[0].childVisibility !== 'hidden') {
      <app-notification-menu
        id="noti-menu"
        (clickOutside)="hideMenu(secondaryNavItems[0])" />
    }

    <!-- User Menu -->
    @if (secondaryNavItems[1].childVisibility !== 'hidden') {
      <app-user-menu
        id="user-menu"
        (clickOutside)="hideMenu(secondaryNavItems[1])" />
    }
  `,
})
export class NavbarComponent {
  private readonly _router = inject(Router);
  private readonly _breakpointService = inject(BreakpointService);

  get route() {
    return this._router.url;
  }

  protected readonly isMobile$: Observable<boolean> =
    this._breakpointService.breakpoints$.pipe(map(({ isMobile }) => isMobile));

  protected readonly primaryNavItems: NavItem[] = [
    { icon: 'home', link: '/home', type: 'regular' },
    { icon: 'screwdriver-wrench', link: '/motorcycles', type: 'regular' },
  ];

  protected readonly secondaryNavItems: NavItem[] = [
    {
      icon: 'bell',
      link: '/notifications',
      type: 'regular',
      childVisibility: 'hidden',
    },
    {
      icon: 'user',
      link: '/users',
      type: 'regular',
      childVisibility: 'hidden',
    },
  ];

  showMenu(item: NavItem): void {
    if (this._router.url === '/notifications' && item.icon === 'bell') {
      return;
    }

    this.secondaryNavItems.forEach((navItem) => {
      const isCurrentItem = navItem === item;
      navItem.type = isCurrentItem
        ? navItem.type === 'solid'
          ? 'regular'
          : 'solid'
        : 'regular';
      navItem.childVisibility = isCurrentItem
        ? navItem.childVisibility === 'hidden'
          ? 'block'
          : 'hidden'
        : 'hidden';
    });
  }

  hideMenu(item: NavItem) {
    if (!this._router.url.startsWith(item.link)) {
      item.childVisibility = 'hidden';
    }
  }

  protected getIconPath(item: NavItem): string {
    const state = this._router.url.startsWith(item.link) ? 'solid' : item.type;
    return `assets/icons/navbar/icons.svg#${item.icon}-${state}`;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.btn-navbar') &&
      !target.closest('#noti-menu') &&
      !target.closest('#user-menu')
    ) {
      this.secondaryNavItems.forEach((navItem) => {
        navItem.type = 'regular';
        navItem.childVisibility = 'hidden';
      });
    }
  }
}
