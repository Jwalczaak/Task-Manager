import {
  Component,
  inject,
  input,
  Input,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';
import { FormFieldConfig, FormSetup } from '../../models/form';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { FormStoreService } from '../../services/stores/form-store.service';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-generic-form',
  imports: [
    ReactiveFormsModule,
    InputNumber,
    InputTextModule,
    MultiSelectModule,
    DatePickerModule,
    Button,
    CommonModule,
    FormsModule,
    SelectModule,
  ],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.scss',
})
export class GenericFormComponent implements OnInit {
  formStore = inject(FormStoreService);
  config = input.required<FormSetup>();

  form = signal<FormGroup>(new FormGroup({}));

  isValid = signal(false);

  ngOnInit(): void {
    const group: { [key: string]: FormControl } = {};
    this.config().fieldsConfig.forEach((field) => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'number') {
        if (field.min !== undefined) validators.push(Validators.min(field.min));
        if (field.max !== undefined) validators.push(Validators.max(field.max));
      }
      const initialValue = this.formStore.data()?.[field.name] ?? '';
      group[field.name] = new FormControl(initialValue, validators);
    });

    this.form.set(new FormGroup(group));
  }

  onSubmit() {
    const formValues = this.form().value;
    this.formStore.setLoading(false);
    this.formStore.setData(formValues);
    this.formStore.setSubmit(true);
  }

  getControl(name: string) {
    return this.form().get(name);
  }
}
