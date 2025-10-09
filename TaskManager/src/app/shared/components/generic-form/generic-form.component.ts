import {
  Component,
  input,
  Input,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';
import { FormFieldConfig, FormSetup } from '../../models/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Calendar } from 'primeng/calendar';
import { Button } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-generic-form',
  imports: [
    ReactiveFormsModule,
    InputNumber,
    InputTextModule,
    MultiSelectModule,
    Calendar,
    Button,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.scss',
})
export class GenericFormComponent implements OnInit {
  config = input.required<FormSetup>();

  formSubmit: OutputEmitterRef<any> = output<any>();
  formClosed: OutputEmitterRef<void> = output<void>();

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
      group[field.name] = new FormControl('', validators);
    });

    this.form.set(new FormGroup(group));
  }

  onSubmit() {
    if (this.form().valid) {
      this.formSubmit.emit(this.form().value);
      this.formClosed.emit();
    } else {
      this.form().markAllAsTouched();
    }
  }

  getControl(name: string) {
    return this.form().get(name);
  }
}
