import { Component, EventEmitter, Input, OnInit, output } from '@angular/core';
import { FormFieldConfig } from '../../models/form-field';

@Component({
  selector: 'app-generic-form',
  imports: [],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.scss',
})
export class GenericFormComponent implements OnInit {
  @Input({ required: true }) config: FormFieldConfig[] = [];
  formSubmit = output<any>;
  formClosed = output<void>;
  ngOnInit(): void {
    console.log(this.config);
  }
}
