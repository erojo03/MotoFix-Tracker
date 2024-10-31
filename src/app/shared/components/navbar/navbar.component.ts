import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
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
    <nav class="relative flex items-center justify-center py-3 bg-primary">
      @if (!isMobile) {
      <div class="flex-1">
        <h1>MG2</h1>
        <h2>Performance</h2>
      </div>
      }

      <!-- Primary Navigation -->
      <div
        class="flex w-full items-center justify-around md:w-auto md:flex-1 md:justify-center md:gap-8"
      >
        @for (item of primaryNavItems; track item.link) {
        <a
          [routerLink]="item.link"
          routerLinkActive="active"
          class="text-3xl text-navy-blue"
        >
          <svg class="icon" [class]="isMobile ? 'size-[26px]' : 'size-[30px]'">
            <use [attr.xlink:href]="getIconPath(item)"></use>
          </svg>
        </a>
        }
      </div>

      <!-- Secondary Navigation -->
      <div
        class="flex w-full items-center justify-around md:w-auto md:flex-1 md:justify-end md:gap-8"
      >
        @if (isMobile) { @for (item of secondaryNavItems; track item.link) {
        <a
          [routerLink]="item.link"
          routerLinkActive="active"
          class="text-3xl text-navy-blue"
        >
          <svg class="icon size-[26px]">
            <use [attr.xlink:href]="getIconPath(item)"></use>
          </svg>
        </a>
        } } @else { @for (item of secondaryNavItems; track item.link) {
        <button
          (click)="toggleChildMenu(item)"
          class="btn-navbar text-navy-blue"
        >
          <svg class="icon size-[30px] fill-black">
            <use [attr.xlink:href]="getIconPath(item)"></use>
          </svg>
        </button>
        } }
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly breakpointService = inject(BreakpointService);

  protected readonly isMobile$: Observable<boolean> =
    this.breakpointService.breakpoints$.pipe(map(({ isMobile }) => isMobile));

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

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe(({ urlAfterRedirects }) => {
        this.updateNavItemStates(urlAfterRedirects);
      });

    this.updateNavItemStates(this.router.url);
  }

  protected getIconPath(item: NavItem): string {
    const state = this.router.url.startsWith(item.link) ? 'solid' : item.type;
    return `assets/icons/navbar/icons.svg#${item.icon}-${state}`;
  }

  protected toggleChildMenu(item: NavItem): void {
    if (this.router.url === '/notification' && item.icon === 'bell') return;

    this.secondaryNavItems.forEach((navItem) => {
      if (navItem !== item) {
        navItem.type = 'regular';
        navItem.childVisibility = 'hidden';
      }
    });

    item.type = item.type === 'solid' ? 'regular' : 'solid';
    item.childVisibility =
      item.childVisibility === 'hidden' ? 'block' : 'hidden';
  }

  private updateNavItemStates(currentUrl: string): void {
    [...this.primaryNavItems, ...this.secondaryNavItems].forEach((item) => {
      item.type = currentUrl.startsWith(item.link) ? 'solid' : 'regular';
    });
  }
}
