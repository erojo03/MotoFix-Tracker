import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private _popups: Record<string, ReturnType<typeof signal<boolean>>> = {};

  private _isClosing = signal(false);

  get isClosingPopup() {
    return this._isClosing;
  }

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
    this.isClosingPopup.set(true);

    setTimeout(() => {
      this.getPopupState(key).set(false);
      this.isClosingPopup.set(false);
    }, 300); // Wait for the animation to complete
  }

  togglePopup(key: string) {
    const currentState = this.getPopupState(key);
    currentState.set(!currentState());
    console.log(`Popup ${key} toggle: ${currentState()}`);
  }
}
