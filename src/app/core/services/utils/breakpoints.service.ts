import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Breakpoints {
  isDesktop: boolean;
  isMobile: boolean;
  isSM: boolean;
  isMD: boolean;
  isLG: boolean;
  isXL: boolean;
  is2XL: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BreakpointService implements OnDestroy {
  private readonly mediaQueries = {
    sm: window.matchMedia('(min-width: 640px)'),
    md: window.matchMedia('(min-width: 768px)'),
    lg: window.matchMedia('(min-width: 1024px)'),
    xl: window.matchMedia('(min-width: 1280px)'),
    '2xl': window.matchMedia('(min-width: 1536px)')
  };

  private readonly breakpointsSubject = new BehaviorSubject<Breakpoints>(this.getCurrentBreakpoints());

  readonly breakpoints$: Observable<Breakpoints> = this.breakpointsSubject.asObservable();

  constructor() {
    this.setupMediaListeners();
  }

  ngOnDestroy(): void {
    this.cleanupMediaListeners();
  }

  private getCurrentBreakpoints(): Breakpoints {
    return {
      isDesktop: this.mediaQueries.lg.matches || this.mediaQueries.xl.matches || this.mediaQueries['2xl'].matches,
      isMobile: !this.mediaQueries.md.matches,
      isSM: this.mediaQueries.sm.matches,
      isMD: this.mediaQueries.md.matches,
      isLG: this.mediaQueries.lg.matches,
      isXL: this.mediaQueries.xl.matches,
      is2XL: this.mediaQueries['2xl'].matches
    };
  }

  private handleMediaChange = (): void => {
    this.breakpointsSubject.next(this.getCurrentBreakpoints());
  };

  private setupMediaListeners(): void {
    Object.values(this.mediaQueries).forEach(query => {
      query.addEventListener('change', this.handleMediaChange);
    });
  }

  private cleanupMediaListeners(): void {
    Object.values(this.mediaQueries).forEach(query => {
      query.removeEventListener('change', this.handleMediaChange);
    });
  }
}
