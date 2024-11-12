import { Component, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PopupService } from '../../../../../../core/services/utils/popup.service';

import { ModelService } from '../../../services/model.service';
import { CloseButtonComponent } from '../../../../../../shared/components/small/close-button/close-button.component';
import { Brand } from '../../../interfaces/brand.interface';
import { SubmitButtonComponent } from '../../../../../../shared/components/small/submit-button/submit-button.component';

interface Product {
  // Define your model interface
  model: FormControl<string>;
}

@Component({
  selector: 'app-model-add',
  standalone: true,
  imports: [ReactiveFormsModule, CloseButtonComponent, SubmitButtonComponent],
  template: `
    <form
      [formGroup]="modelForm"
      (ngSubmit)="onSubmit()"
      class="relative mx-auto flex w-80 max-w-[80%] flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
      <app-close-button popupId="modelAdd" />

      <h1 class="text-center text-lg font-semibold text-primary">
        Agregar Modelo
      </h1>

      <label class="flex flex-col gap-1">
        Marca
        <input
          class="w-full rounded-lg border p-1.5"
          type="text"
          disabled
          [value]="brand().name" />
      </label>

      <label class="flex flex-col gap-1">
        Modelo
        <input
          formControlName="model"
          class="w-full rounded-lg border p-1.5 outline-none focus-visible:border-gray-400"
          type="text"
          id="model"
          name="model"
          placeholder="NAVI" />
      </label>

      <app-submit-button text="Agregar" [formValid]="modelForm.valid" />
    </form>
  `,
  styles: `
    :host {
      @apply content-box;
    }
  `,
})
export class ModelAddComponent {
  brand = input.required<Brand>();

  private readonly _modelService = inject(ModelService);
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _popupService = inject(PopupService);

  modelForm: FormGroup<Product> = this._fb.group({
    model: ['', Validators.required],
  });

  close(key: string): void {
    this._popupService.closePopup(key);
  }

  onSubmit() {
    console.log(this.modelForm.value);

    const { model } = this.modelForm.getRawValue();
    this._modelService.addModel(this.brand().id, model).subscribe({
      next: () => this.close('modelAdd'),
    });
  }
}
