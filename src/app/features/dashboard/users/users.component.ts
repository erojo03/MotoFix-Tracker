import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { PopupService } from '../../../core/services/utils/popup.service';
import { RoleService } from '../../../core/services/data/role.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../../../core/services/data/user.service';
import { AsyncPipe } from '@angular/common';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { BreakpointService } from '../../../core/services/utils/breakpoints.service';
import { map, Observable } from 'rxjs';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    SearchBarComponent,
    UserAddComponent,
    AsyncPipe,
    UserItemComponent,
    UserTableComponent,
    UserEditComponent,
    FilterPipe,
  ],
  template: `
    @let isMobile = isMobile$ | async;
    <!-- Header -->
    <section
      class="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
      <h1 class="text-2xl font-extrabold text-primary">USUARIOS</h1>
      <div class="flex flex-col gap-2.5 md:flex-row-reverse">
        <app-search-bar [(searchValue)]="searchValue" />

        <!-- Header Buttons -->
        <div class="flex flex-shrink-0 gap-2.5">
          <button
            type="button"
            (click)="openPopup('addUser')"
            class="flex w-full items-center justify-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              class="size-5">
              <path
                class="fill-current"
                d="M224 256C294.695 256 352 198.691 352 128S294.695 0 224 0C153.312 0 96 57.309 96 128S153.312 256 224 256ZM274.664 304H173.336C77.609 304 0 381.602 0 477.332C0 496.477 15.523 512 34.664 512H413.336C432.477 512 448 496.477 448 477.332C448 381.602 370.398 304 274.664 304ZM616 200H568V152C568 138.75 557.25 128 544 128S520 138.75 520 152V200H472C458.75 200 448 210.75 448 224S458.75 248 472 248H520V296C520 309.25 530.75 320 544 320S568 309.25 568 296V248H616C629.25 248 640 237.25 640 224S629.25 200 616 200Z" />
            </svg>
            Agregar usuario
          </button>

          <button
            class="flex w-full items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-100 md:w-auto">
            <svg
              class="mr-2 h-4 w-4 text-gray-400"
              viewbox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clip-rule="evenodd" />
            </svg>
            Filtrar
            <svg
              class="-mr-1 ml-1.5 h-5 w-5"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Main -->
    <section
      class="flex flex-grow flex-col items-center gap-3 overflow-y-auto pb-4">
      @let filteredUsers =
        users() | filter: searchValue() : ['firstName', 'lastName', 'phone'];
      @if (isMobile) {
        @for (user of filteredUsers; track user.id) {
          <app-user-item
            [(userId)]="userId"
            [user]="user"
            (openEdit)="openPopup('editUser')"
            (delete)="deleteUser($event)" />
        }
      } @else {
        <app-user-table
          [(userId)]="userId"
          [users]="filteredUsers"
          (openEdit)="openPopup('editUser')"
          (delete)="deleteUser($event)" />
      }
    </section>

    @if (popupState('addUser')) {
      <app-user-add [roles]="roles()" />
    }

    @if (popupState('editUser')) {
      <app-user-edit [roles]="roles()" [user]="user()" />
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
    }
  `,
})
export class UsersComponent implements OnInit {
  private readonly _popupService = inject(PopupService);
  private readonly _userService = inject(UserService);
  private readonly _roleService = inject(RoleService);
  private readonly _breakpointService = inject(BreakpointService);

  protected readonly isMobile$: Observable<boolean> =
    this._breakpointService.breakpoints$.pipe(map(({ isMobile }) => isMobile));

  users = this._userService.users;
  roles = toSignal(this._roleService.getRoles());
  userId = signal('');
  searchValue = signal('');

  user = computed(() => this.users().find((user) => user.id === this.userId()));

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this._userService.getUsers().subscribe();
  }

  deleteUser(id: string): void {
    this._userService.deleteUser(id).subscribe();
  }

  openPopup(key: string): void {
    this._popupService.openPopup(key);
  }

  popupState(key: string): boolean {
    const state = this._popupService.getPopupState(key);
    return state();
  }
}
