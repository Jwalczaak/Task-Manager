import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-generic-modal',
  imports: [CommonModule, ButtonModule],
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss',
})
export class GenericModalComponent {
  width = input.required<string>();
  height = input.required<string>();
  headerText = input.required<string>();
}
