import { Component, inject, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface inputField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  message: string;
}

@Component({
  selector: 'app-input-fields',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <label [for]="field.name" class="flex flex-col gap-1 text-sm font-medium"
      >{{ field.label }}
      <input
        [id]="field.name"
        [formControlName]="field.name"
        [type]="field.type"
        [placeholder]="field.placeholder"
        autocomplete="current-password"
        class="w-full rounded-md border px-3 py-1.5" />
    </label>
  `,
  styles: `
    :host {
      width: 100%;
    }
  `,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class InputFieldsComponent implements OnInit {
  @Input({ required: true }) field!: inputField;

  private parentContainer = inject(ControlContainer);
  private _fb = inject(NonNullableFormBuilder);

  ngOnInit(): void {
    if (this.field.name === 'phone') {
      this.parentForm.addControl(
        this.field.name,
        this._fb.control('', [
          Validators.required,
          Validators.pattern(/^9\d{8}$/),
        ])
      );
    } else {
      this.parentForm.addControl(
        this.field.name,
        this._fb.control('', [Validators.required])
      );
    }
  }

  get parentForm() {
    return this.parentContainer.control as FormGroup;
  }
}
