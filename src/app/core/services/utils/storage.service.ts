import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage = localStorage;

  get(key: string): string | null {
    const value = this._storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  set(key: string, value: string | null): void {
    this._storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this._storage.removeItem(key);
  }
}
