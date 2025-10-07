import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  input,
  output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-generic-modal',
  imports: [CommonModule, ButtonModule],
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss',
})
export class GenericModalComponent implements AfterViewInit {
  width = input.required<string>();
  height = input.required<string>();
  headerText = input.required<string>();
  contentComponent = input.required<Type<any>>();
  contentInputs = input<Record<string, any>>();
  closeModal = output<void>();

  @ViewChild('contentContainer', { read: ViewContainerRef })
  contentContainer!: ViewContainerRef;

  ngAfterViewInit(): void {
    this.renderContent();
  }

  private renderContent() {
    if (!this.contentContainer || !this.contentComponent) return;

    if (this.contentInputs()) {
      const componentRef = this.contentContainer.createComponent(
        this.contentComponent()
      );
      Object.entries(this.contentInputs() ?? {}).forEach(([key, value]) => {
        console.log(key);
        console.log(value);
        console.log(componentRef.instance);
        if (key in componentRef.instance) {
          componentRef.setInput(key, value);
        }
      });
    }
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
