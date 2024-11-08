import { Component, inject, input, OnInit } from '@angular/core';
import { SubmitButtonComponent } from '../../../../../shared/components/small/submit-button/submit-button.component';
import { InputFieldsComponent } from '../../../../../shared/components/small/input-fields/input-fields.component';
import { SelectFieldsComponent } from '../../../../../shared/components/small/select-fields/select-fields.component';
import { Role } from '../../../../../core/interfaces/role.interface';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CloseButtonComponent } from '../../../../../shared/components/small/close-button/close-button.component';
import { UserList } from '../../../../../core/interfaces/user.interface';
import { UserService } from '../../../../../core/services/data/user.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubmitButtonComponent,
    InputFieldsComponent,
    SelectFieldsComponent,
    CloseButtonComponent,
  ],
  template: `
    <section
      class="relative flex w-full flex-col gap-4 rounded-lg bg-white p-6 shadow-xl md:max-w-2xl md:rounded-xl">
      <app-close-button popupId="editUser" />

      <!-- Title -->
      <header class="text-center">
        <h2 class="text-2xl font-bold sm:text-3xl">Editar Usuario</h2>
        <p class="mt-2 text-sm text-gray-600 sm:text-base">
          Modifique los detalles del usuario
        </p>
      </header>

      <!-- Form -->
      <form
        [formGroup]="userForm"
        (ngSubmit)="onSubmit()"
        class="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-4">
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
        text="Guardar Cambios"
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
export class UserEditComponent implements OnInit {
  user = input<UserList>();
  roles = input<Role[]>();

  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _userService = inject(UserService);

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

  ngOnInit(): void {
    this.setForm();
  }

  private async setForm(): Promise<void> {
    const user = this.user();
    if (user) {
      setTimeout(() => {
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role.id,
        });
      }, 0);
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const { firstName, lastName, phone, password, role } =
      this.userForm.getRawValue();

    try {
      const user = this.user();
      if (user) {
        this._userService
          .updateUser(
            user.id,
            firstName,
            lastName,
            phone,
            password,
            Number(role)
          )
          .subscribe();
      } else {
        console.error('User is undefined');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  }
}
