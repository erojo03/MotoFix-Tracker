import { Component, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PopupService } from '../../../../../../core/services/utils/popup.service';
import { BrandService } from '../../../services/brand.service';
import { CloseButtonComponent } from '../../../../../../shared/components/small/close-button/close-button.component';
import { SubmitButtonComponent } from '../../../../../../shared/components/small/submit-button/submit-button.component';

@Component({
  selector: 'app-brand-add',
  standalone: true,
  imports: [ReactiveFormsModule, CloseButtonComponent, SubmitButtonComponent],
  template: `
    <form
      [formGroup]="brandForm"
      (ngSubmit)="onSubmit()"
      class="relative flex w-80 max-w-[80%] flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
      <app-close-button popupId="brandAdd" />

      <h1 class="text-center text-lg font-semibold text-primary">
        Agregar Marca
      </h1>

      <label class="flex flex-col gap-1">
        Marca
        <input
          formControlName="brand"
          class="w-full rounded-lg border p-1.5 outline-none focus-visible:border-gray-400"
          type="text"
          id="brand"
          name="brand"
          placeholder="Honda" />
      </label>

      <app-submit-button text="Agregar" [formValid]="brandForm.valid" />
    </form>
  `,
  styles: `
    :host {
      @apply content-box;
    }
  `,
})
export class BrandAddComponent {
  private readonly _brandService = inject(BrandService);
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _popupService = inject(PopupService);

  brandForm: FormGroup = this._fb.group({
    brand: ['', Validators.required],
  });

  close(key: string): void {
    this._popupService.closePopup(key);
  }

  onSubmit(): void {
    const { brand } = this.brandForm.value;
    this._brandService.addBrand(brand).subscribe({
      next: () => this.close('brandAdd'),
    });
  }
}
