import {
  Component,
  computed,
  inject,
  signal,
  Signal,
  effect,
  WritableSignal,
  EffectRef,
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
import { Task, TaskRequest } from '../../shared/models/task';
import { GenericFormComponent } from '../../shared/components/generic-form/generic-form.component';
import {
  FormMode,
  FormSetup,
  TASK_CREATE_CONFIG,
  TASK_UPDATE_CONFIG,
} from '../../shared/models/form';
import { GenericModalComponent } from '../../shared/components/generic-modal/generic-modal.component';
import { FormStoreService } from '../../shared/services/stores/form-store.service';
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
  private formStore = inject(FormStoreService);
  currentFormConfig: Signal<FormSetup> = computed(() => {
    const mode = this.formStore.mode();
    return mode === 'create' ? TASK_CREATE_CONFIG : TASK_UPDATE_CONFIG;
  });
  loading: Signal<boolean> = computed(() => this.taskStore.loading());
  tasks: Signal<Task[] | undefined> = computed(() => this.taskStore.tasks());
  showForm: WritableSignal<boolean> = signal(false);
  showModal: WritableSignal<boolean> = signal(false);
  taskId: WritableSignal<number> = signal(0);
  GenericFormComponent = GenericFormComponent;

  formEffect: EffectRef = effect(() => {
    const isSubmited = this.formStore.isSubmited();
    const formState = this.formStore.state();
    const formMode = this.formStore.mode();
    const payload: TaskRequest = formState.data;

    if (isSubmited && payload && formMode === 'create') {
      this.createTask(payload);
    } else if (isSubmited && payload && formMode === 'update') {
      this.updateTask(payload, this.taskId());
      this.formStore.reset();
    }
  });

  actionSuccessEffect: EffectRef = effect(() => {
    if (this.taskStore.actionSuccess()) {
      this.showModal.set(false);
      this.formStore.reset();
      this.taskStore.actionSuccess.set(false);
    }
  });

  createTask(payload: TaskRequest): void {
    this.taskStore.createTask(payload);
  }

  updateTask(payload: TaskRequest, taskId: number): void {
    this.taskStore.updateTask(payload, taskId);
  }

  openModal(mode: FormMode, data: Task | null): void {
    this.formStore.setMode(mode);
    this.formStore.setData(data);
    if (mode === 'update' && !!data) {
      this.taskId.set(data.id);
    }
    this.showModal.set(true);
  }

  onHandleCloseModal(): void {
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
