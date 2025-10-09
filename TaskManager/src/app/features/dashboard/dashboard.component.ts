import {
  Component,
  computed,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TaskStoreService } from '../../shared/services/task-store.service';
import { Task } from '../../shared/models/task';
import { GenericFormComponent } from '../../shared/components/generic-form/generic-form.component';
import {
  FormSetup,
  TASK_ADD_OR_UPDATE_CONFIG,
} from '../../shared/models/form-field';
import { GenericModalComponent } from '../../shared/components/generic-modal/generic-modal.component';
@Component({
  selector: 'app-dashboard',
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    GenericFormComponent,
    GenericModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private taskStore = inject(TaskStoreService);

  TASK_ADD_OR_UPDATE_CONFIG: FormSetup = TASK_ADD_OR_UPDATE_CONFIG;
  loading: Signal<boolean> = computed(() =>
    this.taskStore.tasksResource.isLoading()
  );
  tasks: Signal<Task[] | undefined> = computed(() =>
    this.taskStore.tasksResource.value()
  );
  showForm: WritableSignal<boolean> = signal(false);
  showModal: WritableSignal<boolean> = signal(false);

  GenericFormComponent = GenericFormComponent;
  openModal(): void {
    this.showModal.set(true);
  }

  onHandleCloseModal(): void {
    console.log('is closing');
    this.showModal.set(false);
  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':
        return null;
    }

    return null;
  }
}
