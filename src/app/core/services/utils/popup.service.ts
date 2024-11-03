import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private _popups: Record<string, ReturnType<typeof signal<boolean>>> = {};

  getPopupState(key: string) {
    if (!this._popups[key]) {
      this._popups[key] = signal(false);
    }
    return this._popups[key];
  }

  openPopup(key: string) {
    this.getPopupState(key).set(true);
  }

  closePopup(key: string) {
    this.getPopupState(key).set(false);
  }

  togglePopup(key: string) {
    const currentState = this.getPopupState(key);
    currentState.set(!currentState());
    console.log(`Popup ${key} toggle: ${currentState()}`);
  }
}
