import { Component, inject, input } from '@angular/core';
import { DialogConfig } from '../../models/modal-config';
import { ButtonModule } from 'primeng/button';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  imports: [ButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  config = input.required<DialogConfig>();
  dialogService = inject(DialogService);
  onCancel(): void {
    this.dialogService.setMode('cancel');
  }
  onAccept(): void {
    this.dialogService.setMode('accept');
  }
}
