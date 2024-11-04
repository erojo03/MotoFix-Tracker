import { Component, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { SubmitButtonComponent } from '../../shared/components/small/submit-button/submit-button.component';
import { InputFieldsComponent } from '../../shared/components/small/input-fields/input-fields.component';
import { AuthService } from '../../core/services/data/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, SubmitButtonComponent, InputFieldsComponent],
  template: `
    <main class="flex h-dvh flex-col items-center justify-center px-9">
      <img
        src="assets/wave-1.svg"
        alt="wave"
        class="fixed right-0 top-0 -z-10" />
      <img
        src="assets/wave-2.svg"
        alt="wave"
        class="fixed bottom-0 left-0 -z-10" />

      <div
        class="flex w-full max-w-md flex-col items-center justify-center gap-6">
        <div class="flex w-full flex-col items-center justify-center gap-6">
          <h1
            class="shadow-title-login rounded-3xl bg-[#EA5656] px-4 text-center text-[2.5rem] font-bold text-white">
            BIENVENIDO
          </h1>
          <form
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
            class="flex w-full flex-col items-center gap-3">
            @for (field of fields; track field.name) {
              <app-input-fields [field]="field" />
            }

            <button
              class="from-4% hover:shadow-btn-login-hover shadow-btn-login mt-5 flex w-48 items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-[#627fdf] to-[#102e6a] to-100% px-4 py-3 font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:from-[#102e6a] hover:to-[#627fdf]">
              Iniciar Sesion
            </button>
          </form>
        </div>
        <div class="">
          <img src="assets/logo.webp" alt="logo" class="w-56" />
        </div>
      </div>
    </main>
  `,
  styles: ``,
})
export class LoginComponent {
  private readonly _fb = inject(NonNullableFormBuilder);
  private _authService = inject(AuthService);

  fields = [
    {
      name: 'phone',
      label: 'Celular',
      type: 'tel',
      placeholder: '999999999',
      mensaje: 'Ingresa un numero correcto',
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: '*********',
      mensaje: 'Ingresa una contraseña valida',
    },
  ];

  loginForm: FormGroup = this._fb.group({});

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { phone, password } = this.loginForm.getRawValue();

      this._authService.logIn(phone, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Handle successful login
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle login error
        },
      });
    }
  }
}
