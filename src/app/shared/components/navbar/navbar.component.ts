import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BreakpointService } from '../../../core/services/utils/breakpoints.service';
import { AsyncPipe } from '@angular/common';

interface NavItem {
  icon: string;
  link: string;
  type: 'regular' | 'solid';
  childVisibility?: 'hidden' | 'block';
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  template: `
    @let isMobile = isMobile$ | async;
    <nav class="relative flex items-center justify-center py-3">
      @if (!isMobile) {
        <div class="flex-1">
          <h1>MG2</h1>
          <h2>Performance</h2>
        </div>
      }

      <!-- Primary Navigation -->
      <div
        class="flex w-full justify-around md:w-auto md:flex-1 md:justify-center md:gap-8">
        @for (item of primaryNavItems; track item.link) {
          <a [routerLink]="item.link" routerLinkActive="active">
            <svg [class]="isMobile ? 'size-[26px]' : 'size-[30px]'">
              <use [attr.xlink:href]="getIconPath(item)"></use>
            </svg>
          </a>
        }
      </div>

      <!-- Secondary Navigation -->
      <div
        class="flex w-full justify-around md:w-auto md:flex-1 md:justify-end md:gap-8">
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
            <button (click)="showMenu(item)">
              <svg class="size-[30px]">
                <use [attr.xlink:href]="getIconPath(item)"></use>
              </svg>
            </button>
          }
        }
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  private readonly _router = inject(Router);
  private readonly _breakpointService = inject(BreakpointService);

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

  protected getIconPath(item: NavItem): string {
    const state = this._router.url.startsWith(item.link) ? 'solid' : item.type;
    return `assets/icons/navbar/icons.svg#${item.icon}-${state}`;
  }
}
