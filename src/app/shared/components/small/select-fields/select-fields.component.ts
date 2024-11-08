import { Component, inject, Input, input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface Entity {
  id: number;
  name: string;
}

@Component({
  selector: 'app-select-fields',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <label class="flex flex-col gap-2 text-sm font-medium">
      {{ title }}
      <select
        [formControlName]="controlKey"
        class="w-full rounded-md border px-3 py-1.5">
        <option value="" disabled selected>{{ messageSelect }}</option>
        @for (entity of entities(); track entity.id) {
          <option [value]="entity.id">{{ entity.name }}</option>
        }
      </select>
    </label>
  `,
  styles: `
    :host {
      flex: 1;
    }

    @media (min-width: 640px) {
      :host {
        grid-column: span 2;
      }
    }
  `,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class SelectFieldsComponent implements OnInit {
  @Input({ required: true }) title = '';
  @Input({ required: true }) controlKey = '';
  @Input({ required: true }) messageSelect = '';
  entities = input<Entity[]>();

  private parentContainer = inject(ControlContainer);
  private _fb = inject(NonNullableFormBuilder);

  ngOnInit(): void {
    this.parentForm.addControl(
      this.controlKey,
      this._fb.control('', [Validators.required])
    );
  }

  get parentForm() {
    return this.parentContainer.control as FormGroup;
  }
}
