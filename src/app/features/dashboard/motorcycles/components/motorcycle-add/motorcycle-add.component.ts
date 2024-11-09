import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { CloseButtonComponent } from '../../../../../shared/components/small/close-button/close-button.component';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputFieldsComponent } from '../../../../../shared/components/small/input-fields/input-fields.component';
import { SelectFieldsComponent } from '../../../../../shared/components/small/select-fields/select-fields.component';
import { ModelService } from '../../services/model.service';
import { filter, tap } from 'rxjs';
import { MotorcycleService } from '../../services/motorcycle.service';
import { PopupService } from '../../../../../core/services/utils/popup.service';
import { Brand } from '../../interfaces/brand.interface';
import { CurrentUserService } from '../../../../../core/services/data/current-user.service';

@Component({
  selector: 'app-motorcycle-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CloseButtonComponent,
    InputFieldsComponent,
    SelectFieldsComponent,
  ],
  template: `
    <section
      class="relative flex w-[435px] flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
      <app-close-button popupId="motorcycleAdd" />

      <h1 class="text-center text-2xl font-bold text-gray-800">
        Registro de Moto
      </h1>
      <form
        [formGroup]="motorcycleForm"
        (ngSubmit)="onSubmit()"
        class="flex flex-col gap-4">
        @for (field of selectFields; track field.controlKey) {
          <div class="flex gap-1">
            <app-select-fields
              [title]="field.title"
              [controlKey]="field.controlKey"
              [entities]="field.entities()"
              [messageSelect]="field.messageSelect" />

            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center self-end rounded-md border text-lg transition-colors hover:bg-[#F4F4F5] disabled:pointer-events-none disabled:opacity-50">
              <span>+</span>
            </button>
          </div>
        }

        @for (field of fields; track field.name) {
          <app-input-fields [field]="field" />
        }

        <button
          type="submit"
          [disabled]="motorcycleForm.invalid"
          class="hover:bg-navy-blue w-full rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50">
          Registrar Moto
        </button>
      </form>
    </section>
  `,
  styles: `
    :host {
      @apply content-box;
    }
  `,
})
export class MotorcycleAddComponent implements OnInit {
  brands = input.required<Brand[]>();

  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _motorcycleService = inject(MotorcycleService);
  private readonly _modelService = inject(ModelService);
  private readonly _popupService = inject(PopupService);
  private _currentUser = inject(CurrentUserService);

  models = this._modelService.models;

  selectFields = [
    {
      title: 'Marcas',
      controlKey: 'brand',
      entities: this.brands,
      messageSelect: 'Seleccione una marca',
      messageAlert: 'La marca es requerida',
    },
    {
      title: 'Modelo',
      controlKey: 'model',
      entities: this.models,
      messageSelect: 'Seleccione un modelo',
      messageAlert: 'El modelo es requerido',
    },
  ];

  fields = [
    {
      label: 'Placa',
      name: 'plate',
      type: 'text',
      placeholder: 'ABC123',
      message: 'La placa es requerida y debe tener 6 caracteres alfanuméricos',
    },
    {
      label: 'Fecha y Hora de Entrega',
      name: 'datetime',
      type: 'datetime-local',
      placeholder: 'YYYY-MM-DDTHH:MM',
      message: 'La fecha y hora de entrega es requerida',
    },
  ];

  motorcycleForm: FormGroup = this._fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
  });

  ngOnInit(): void {
    this.setupBrandChangeListener();
  }

  onSubmit() {
    console.log(this.motorcycleForm.value);
    if (this.motorcycleForm.invalid) {
      this.motorcycleForm.markAllAsTouched();
      return;
    }

    const { brand, model, plate, datetime } = this.motorcycleForm.getRawValue();
    const isoDatetime = new Date(datetime).toISOString();

    this._motorcycleService
      .addMoto(
        Number(brand),
        Number(model),
        plate,
        isoDatetime,
        this._currentUser.id
      )
      .subscribe({
        next: () => {
          this._popupService.closePopup('motorcycleAdd');
        },
        error: (error) => {
          // this.errorRegister = true;
          console.error('Error al registrar la moto:', error);
        },
      });
  }

  private setupBrandChangeListener(): void {
    const modelControl = this.motorcycleForm.get('model');
    const brandControl = this.motorcycleForm.get('brand');

    modelControl?.disable();

    brandControl?.valueChanges
      .pipe(
        filter(Boolean),
        tap(() => modelControl?.enable()),
        tap((brandId) => this.loadModels(brandId))
      )
      .subscribe();
  }

  private loadModels(brandId: number): void {
    this._modelService.getModelsByBrand(brandId).subscribe();
  }
}
