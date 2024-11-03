import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { SubmitButtonComponent } from '../../../../../shared/components/small/submit-button/submit-button.component';
import { SelectFieldsComponent } from '../../../../../shared/components/small/select-fields/select-fields.component';
import { InputFieldsComponent } from '../../../../../shared/components/small/input-fields/input-fields.component';

@Component({
  selector: 'app-user-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubmitButtonComponent,
    SelectFieldsComponent,
    InputFieldsComponent,
  ],
  template: `
    <section
      class="relative flex w-full flex-col gap-4 rounded-lg bg-white p-6 shadow-xl md:max-w-2xl md:rounded-xl">
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
        class="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-4">
        @for (field of fields; track field.name) {
          <app-input-fields [field]="field" />
        }
        <app-select-fields title="Rol" controlKey="role" />
      </form>

      <!-- Submit Button -->
      <app-submit-button
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
  private readonly _fb = inject(NonNullableFormBuilder);

  fields = [
    {
      name: 'firstName',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Juan',
      mensaje: 'Ingresa un nombre correcto',
    },
    {
      name: 'lastName',
      label: 'Apellido',
      type: 'text',
      placeholder: 'Pérez',
      mensaje: 'Ingresa un apellido correcto',
    },
    {
      name: 'phone',
      label: 'Celular',
      type: 'tel',
      placeholder: '999 999 999',
      mensaje: 'Ingresa un número de celular válido',
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: '••••••••',
      mensaje: 'Ingresa una contraseña',
    },
  ];

  userForm: FormGroup = this._fb.group({});

  onSubmit(): void {
    console.log(this.userForm.value);
  }
}
