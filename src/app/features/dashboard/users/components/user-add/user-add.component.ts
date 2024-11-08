import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { SubmitButtonComponent } from '../../../../../shared/components/small/submit-button/submit-button.component';
import { SelectFieldsComponent } from '../../../../../shared/components/small/select-fields/select-fields.component';
import { InputFieldsComponent } from '../../../../../shared/components/small/input-fields/input-fields.component';
import { CloseButtonComponent } from '../../../../../shared/components/small/close-button/close-button.component';
import { Role } from '../../../../../core/interfaces/role.interface';
import { PopupService } from '../../../../../core/services/utils/popup.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../../../core/services/data/user.service';

@Component({
  selector: 'app-user-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubmitButtonComponent,
    SelectFieldsComponent,
    InputFieldsComponent,
    CloseButtonComponent,
  ],
  template: `
    <section
      class="relative flex w-full flex-col gap-4 rounded-lg bg-white p-6 shadow-xl md:max-w-2xl md:rounded-xl">
      <app-close-button popupId="addUser" />

      <!-- Title -->
      <header class="text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">Agregar Nuevo Usuario</h1>
        <p class="mt-2 text-sm text-gray-600 sm:text-base">
          Complete los detalles del nuevo usuario
        </p>
      </header>

      <!-- Form -->
      <form
        [formGroup]="userForm"
        (ngSubmit)="onSubmit()"
        class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
        @for (field of fields; track field.name) {
          <app-input-fields [field]="field" />
        }
        <app-select-fields
          title="Rol"
          [entities]="roles()"
          controlKey="role"
          messageSelect="Seleccione un Rol" />
      </form>

      <!-- Submit Button -->
      <app-submit-button
        text="Agregar Usuario"
        [formValid]="userForm.valid"
        (submitForm)="onSubmit()" />
    </section>
  `,
  styles: `
    :host {
      @apply content-box;
    }
  `,
})
export class UserAddComponent {
  roles = input<Role[]>();

  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _userService = inject(UserService);
  private readonly _popupService = inject(PopupService);

  fields = [
    {
      name: 'firstName',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Juan',
      message: 'Ingresa un nombre correcto',
    },
    {
      name: 'lastName',
      label: 'Apellido',
      type: 'text',
      placeholder: 'Pérez',
      message: 'Ingresa un apellido correcto',
    },
    {
      name: 'phone',
      label: 'Celular',
      type: 'tel',
      placeholder: '999 999 999',
      message: 'Ingresa un número de celular válido',
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: '••••••••',
      message: 'Ingresa una contraseña',
    },
  ];

  userForm: FormGroup = this._fb.group({});

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const { firstName, lastName, phone, password, role } =
      this.userForm.getRawValue();

    this._userService
      .createUser(firstName, lastName, phone, password, Number(role))
      .subscribe({
        next: () => {
          // this.userForm.reset();
          this._popupService.closePopup('addUser');
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            // Ejemplo: Bad Request
            console.error('Error al registrar usuario:', error.error);
          } else {
            console.error('Error inesperado:', error);
          }
        },
      });
  }
}
